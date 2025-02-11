import React, { useState } from "react";
import { useCart } from "../contexts/cartContext";
import { Link } from "react-router-dom";

const Checkout = () => {
    const { cartList, clearFromCart } = useCart();

    // Filter only selected items for checkout
    const selectedItems = cartList.filter(item => item.selected);

    return (
        <section className="max-w-4xl mx-auto p-6 my-10">
            <h2 className="text-3xl font-semibold text-center mb-6">Checkout</h2>

            {/* Cart Items Summary */}
            <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-4">Your Cart</h3>
                <table className="table-auto w-full text-left border border-gray-200">
                    <thead>
                        <tr className="bg-violet-100">
                            <th className="px-4 py-2">Item</th>
                            <th className="px-4 py-2">Fabric Type</th>
                            <th className="px-4">Price</th>
                            <th className="px-4 py-2">Quantity</th>
                            <th className="px-4 py-2 text-right">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedItems?.map((dress) => (
                            <tr className="border-b" key={dress.id}>
                                <td className="px-4 ">{dress?.name}</td>
                                <td className="px-4 ">{dress?.fabric_type}</td>
                                <td className="px-4 ">
                                    <td className="text-right">
                                        {(parseFloat(dress?.discount_price) || parseFloat(dress?.base_price)).toFixed(2)}
                                    </td>
                                </td>
                                <td className="px-4 ">{dress?.quantity}</td>
                                <td className="px-4 text-right ">
                                    {(
                                        dress?.quantity * (dress?.discount_price || dress?.base_price)
                                    ).toFixed(2)}
                                </td>
                            </tr>
                        ))}
                        <tr className="font-bold">
                            <td colSpan={4} className="px-20 py-2 text-right">
                                Total
                            </td>
                            <td className="px-4 py-2 text-right">
                                {selectedItems.reduce((acc, dress) => acc + (parseFloat(dress.discount_price || dress.base_price) * dress.quantity), 0).toFixed(2)}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

 

            {/* Continue Shopping */}
            <div className="flex justify-center mt-6">
                <Link to="/dresses" className="text-violet-500 hover:text-violet-700 font-medium">
                    Continue Shopping
                </Link>
            </div>
            
            <Link to='http://127.0.0.1:8000/payments/'>
                <button type="submit" className="bg-violet-500 text-white px-8 py-3 rounded-md hover:bg-violet-600">
                    Complete Order
                </button>
            </Link>
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
