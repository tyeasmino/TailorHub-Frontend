import React, { useContext, useEffect, useState } from "react"; 
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";

const Checkout = () => {
    const { user } = useContext(AuthContext);
    const token = localStorage.getItem('token');
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dresses, setDresses] = useState([]);
    const [services, setServices] = useState([]);

    useEffect(() => {
        if (!token) {
            setError('Authentication required');
            setLoading(false);
            return;
        }

        // Fetch cart items for the logged-in user
        axios.get('http://127.0.0.1:8000/orders/mycart/', {
            headers: {
                'Authorization': `Token ${token}`,
            }
        })
            .then(response => {
                console.log('Cart Response:', response.data);
                setCartItems(response.data);  // Set cart items in the state
                setLoading(false);
            })
            .catch(err => {
                setError('Error fetching cart items');
                setLoading(false);
            });

        // Fetch all dresses (used to resolve fabric_or_dress_name)
        axios.get('http://127.0.0.1:8000/inventory/all_items/', {
            headers: {
                'Authorization': `Token ${token}`,
            }
        })
            .then(response => {
                console.log('Dresses Response:', response.data);  // Log the response to check the structure
                // Access the 'results' array from the paginated response
                if (Array.isArray(response.data.results)) {
                    setDresses(response.data.results);  // Set dresses to the 'results' array
                } else {
                    setDresses([]);  // If no results or unexpected format
                    setError('Unexpected data format for dresses');
                }
            })
            .catch(err => {
                setError('Error fetching dresses');
            });



        // Fetch all services (used to resolve tailorService_name)
        axios.get('http://127.0.0.1:8000/measurements/dress_category/', {
            headers: {
                'Authorization': `Token ${token}`,
            }
        })
            .then(response => {
                setServices(response.data);  // Set services array
            })
            .catch(err => {
                setError('Error fetching tailor services');
            });

    }, [token]);


    // Calculate total price and selected dress price
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            const dress = Array.isArray(dresses) ? dresses.find(d => d.id === item.fabric_or_dress) : null;
            const service = Array.isArray(services) ? services.find(s => s.id === item.tailorService) : null;

            const dressPrice = parseFloat(dress?.discount_price) || 0;
            const serviceCharge = parseFloat(service?.sell_price_per_unit) || 0;
            const quantity = item.fabric_or_dress_quantity || 1;

            // Calculate the subtotal (dress price * quantity + service charge)
            const subtotal = (dressPrice * quantity) + serviceCharge;

            return total + subtotal; // Add the subtotal to the total
        }, 0);
    };
    const total = calculateTotal();

    // Show loading message while data is being fetched
    if (loading && !cartItems.length) {
        return <div className="text-center text-xl font-semibold py-10">Loading...</div>;
    }

    // Show error message if there is any issue
    if (error) {
        return <div className="text-center text-red-600 py-10">{error}</div>;
    }


    return (
        <section className="max-w-screen-xl w-full mx-auto p-6 my-10">
            <h2 className="text-3xl font-semibold text-center mb-6">Checkout with your information</h2>

            <div className="flex gap-8">
                {/* Personal Information Form */}
                <div className="w-2/3 p-6 bg-white shadow-md rounded-lg border border-gray-300">
                    <h3 className="text-2xl font-semibold mb-4">Personal Details</h3>
                    <form>
                        {/* Name */}
                        <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your Full Name</label>
                        <input 
                            type="text" 
                            id="name" 
                            placeholder="Enter your full name" 
                            className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            required 
                        />
                        </div>

                        {/* Email */}
                        <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input 
                            type="email" 
                            id="email" 
                            placeholder="Enter your email" 
                            className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            required 
                        />
                        </div>

                        {/* Phone */}
                        <div className="mb-4">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                        <input 
                            type="tel" 
                            id="phone" 
                            placeholder="Enter your phone number" 
                            className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            required 
                        />
                        </div>

                        {/* Address */}
                        <div className="mb-4">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                        <textarea 
                            id="address" 
                            placeholder="Enter your address" 
                            rows="4" 
                            className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            required 
                        ></textarea>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-center mt-6">
                            <button 
                                type="submit" 
                                className="bg-black text-sm text-white px-8 py-3 rounded-md hover:bg-violet-500 transition duration-300"
                            >
                                Continue to Payment
                            </button>
                        </div>
                    </form>
                </div>

                {/* Cart Items Summary */}
                <div className="w-1/3 bg-white p-6 shadow-md shadow-violet-200 rounded-lg border border-gray-300">
                <h3 className="text-2xl font-semibold mb-4">Your Cart</h3>
                <table className="w-full">
                    <thead>
                    <tr className="border-b">
                        <th className="text-left px-4 py-2">Item</th>
                        <th className="text-right px-4 py-2">Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    {cartItems.map((item) => {
                        const dress = dresses.find(d => d.id === item.fabric_or_dress);
                        const service = services.find(s => s.id === item.tailorService);
                        const dressPrice = parseFloat(dress?.discount_price) || 0;
                        const serviceCharge = parseFloat(service?.sell_price_per_unit) || 0;
                        const quantity = item.fabric_or_dress_quantity || 1;
                        const subtotal = (dressPrice * quantity) + serviceCharge;

                        return (
                        <tr key={item.id} className="border-b">
                            <td className="px-4 py-2">{dress?.name.slice(0, 25) || ' '}...</td>
                            <td className="px-4 py-2 text-right">{subtotal.toFixed(2)}</td>
                        </tr>
                        );
                    })}
                    <tr className="font-bold">
                        <td className="px-4 py-2">Total</td>
                        <td className="px-4 py-2 text-right">{total.toFixed(2)}</td>
                    </tr>
                    </tbody>
                </table>
                </div>
            </div>

            <div className="flex justify-center px-10 mt-10">
                <Link to={`http://127.0.0.1:8000/payments/?ffid=${user.fitFinder}`}>
                    <button type="submit" className="bg-violet-500 text-sm font-semibold text-white px-8 py-2 rounded-md">
                        Complete Order
                    </button>
                </Link>
            </div>
        </section>
    );
};

export default Checkout;










// import React, { useEffect, useState } from "react";
// import { useCart } from "../contexts/cartContext";
// import { Link } from "react-router-dom";

// // Function to send cart data to the server
// const sendCartItemsToServer = async (cartItems, orderTotal) => {
//     try {
//       const response = await fetch("http://localhost:8000/store-cart-items/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ cart_items: cartItems, order_total: orderTotal }), // Sending total along with cart items
//       });
  
//       const data = await response.json();
//       if (data.status === "success") {
//         console.log("Cart items sent successfully");
//       } else {
//         console.log("Failed to send cart items");
//       }
//     } catch (error) {
//       console.error("Error sending cart items:", error);
//     }
//   };
  

//   const completeOrder = async () => {
//     // Assuming cartData and totalAmount are already defined in your state or from local storage
//     const response = await fetch('http://127.0.0.1:8000/payments/', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             cart_items: cartData,  // Send the cart items
//             order_total: totalAmount,  // Send the calculated total
//         }),
//     });

//     const data = await response.json();
//     if (data.status === 'success') {
//         // The backend will redirect to SSLCommerz payment page
//         window.location.href = data.payment_url;
//     } else {
//         alert('Error: Could not process payment');
//     }
// };



// const Checkout = () => {
//   const { cartList, clearFromCart } = useCart();

//   // Filter only selected items for checkout
//   const selectedItems = cartList.filter(item => item.selected);

//   // Prepare the cart data in the format the backend expects
//   const cartData = selectedItems.map(item => ({
//     id: item.id,
//     name: item.name,
//     quantity: item.quantity,
//     price: item.discount_price || item.base_price,
//     total_price: item.quantity * (item.discount_price || item.base_price),
//   }));

//   // Send the cart items to the server when the user clicks the "Complete Order" button
//   const handleCompleteOrder = async () => {
//     // Calculate the total amount dynamically from selected items
//     const totalAmount = selectedItems.reduce((acc, dress) => {
//       return acc + (parseFloat(dress.discount_price || dress.base_price) * dress.quantity);
//     }, 0);
  
//     // Prepare the data to be sent to the backend
//     const cartData = selectedItems.map(item => ({
//       id: item.id,
//       name: item.name,
//       quantity: item.quantity,
//       price: item.discount_price || item.base_price,
//       total_price: item.quantity * (item.discount_price || item.base_price),
//     }));
  
//     // Send the cart items and total amount to the backend
//     await sendCartItemsToServer(cartData, totalAmount);
  
//     // Redirect to payment gateway
//     window.location.href = "http://127.0.0.1:8000/payments/";
//   };


//   // Add this to handle response after redirect from SSLCommerz
// const handlePaymentResponse = async () => {
//     const params = new URLSearchParams(window.location.search);
//     const status = params.get("status");  // Payment status, Success or Fail
//     const transactionId = params.get("tran_id");  // Transaction ID
  
//     if (status === "success" && transactionId) {
//       // If payment is successful, you can either show confirmation or create order via backend
//       const response = await fetch("http://localhost:8000/payments/goback", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ tran_id: transactionId, status: "Success" }),
//       });
  
//       const data = await response.json();
  
//       if (data.status === "success") {
//         // Redirect to order confirmation page or show confirmation message
//         window.location.href = "/order-confirmation";  // Modify this path as needed
//       } else {
//         // If something goes wrong, show an error message
//         alert("Payment failed. Please try again.");
//       }
//     } else {
//       alert("Payment failed. Please try again.");
//     }
//   };
  
//   useEffect(() => {
//     handlePaymentResponse();
//   }, []);
  
  

//   return (
//     <section className="max-w-4xl mx-auto p-6 my-10">
//       <h2 className="text-3xl font-semibold text-center mb-6">Checkout</h2>

//       {/* Cart Items Summary */}
//       <div className="mb-8">
//         <h3 className="text-2xl font-semibold mb-4">Your Cart</h3>
//         <table className="table-auto w-full text-left border border-gray-200">
//           <thead>
//             <tr className="bg-violet-100">
//               <th className="px-4 py-2">Item</th>
//               <th className="px-4 py-2">Fabric Type</th>
//               <th className="px-4">Price</th>
//               <th className="px-4 py-2">Quantity</th>
//               <th className="px-4 py-2 text-right">Total</th>
//             </tr>
//           </thead>
//           <tbody>
//             {selectedItems?.map((dress) => (
//               <tr className="border-b" key={dress.id}>
//                 <td className="px-4 ">{dress?.name}</td>
//                 <td className="px-4 ">{dress?.fabric_type}</td>
//                 <td className="px-4 ">
//                   <td className="text-right">
//                     {(parseFloat(dress?.discount_price) || parseFloat(dress?.base_price)).toFixed(2)}
//                   </td>
//                 </td>
//                 <td className="px-4 ">{dress?.quantity}</td>
//                 <td className="px-4 text-right ">
//                   {(
//                     dress?.quantity * (dress?.discount_price || dress?.base_price)
//                   ).toFixed(2)}
//                 </td>
//               </tr>
//             ))}
//             <tr className="font-bold">
//               <td colSpan={4} className="px-20 py-2 text-right">
//                 Total
//               </td>
//               <td className="px-4 py-2 text-right">
//                 {selectedItems.reduce((acc, dress) => acc + (parseFloat(dress.discount_price || dress.base_price) * dress.quantity), 0).toFixed(2)}
//               </td>
//             </tr>
//           </tbody>
//         </table>
//       </div>

//       {/* Continue Shopping */}
//       <div className="flex justify-center mt-6">
//         <Link to="/dresses" className="text-violet-500 hover:text-violet-700 font-medium">
//           Continue Shopping
//         </Link>
//       </div>

//       <button 
//         onClick={handleCompleteOrder} 
//         className="bg-violet-500 text-white px-8 py-3 rounded-md hover:bg-violet-600"
//       >
//         Complete Order
//       </button>
//     </section>
//   );
// };

// export default Checkout;
