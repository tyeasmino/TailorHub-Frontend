import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdRemoveShoppingCart } from 'react-icons/md';
import { Link } from 'react-router-dom'; // Correct import

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');
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


    const handleRemoveItem = (itemId) => {
        axios.delete(`http://127.0.0.1:8000/orders/mycart/${itemId}/`, {
            headers: {
                'Authorization': `Token ${token}`,
            },
        })
            .then((response) => {
                // If successful, update the state to remove the item from the cart
                setCartItems((prevCartItems) => prevCartItems.filter(item => item.id !== itemId));
            })
            .catch((error) => {
                console.error('Error deleting item from cart', error);
            });
    };



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
        <section className='flex'>
            <section className="flex rounded-3xl flex-col m-auto shadow-lg my-20 p-10 max-w-screen-xl w-full">
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-3xl font-bold">Your Cart</h2>
                </div>

                {/* Table to display inventory items */}
                <table className="table-auto w-full text-left">
                    <thead>
                        <tr className='border-b'>
                            <th className="px-4 py-2">Date</th>
                            <th className="px-4 py-2">Item Name</th>
                            <th className="px-4 py-2">Qnt</th>
                            <th className="text-right px-4 py-2">Price</th>
                            <th className="px-4 py-2">Dress Type</th>
                            <th className="text-right px-4 py-2">Service Charge</th>
                            <th className="text-right px-4 py-2">Sub Total</th>
                            <th className="px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cartItems?.map((item) => {
                                const dress = Array.isArray(dresses) ? dresses.find(d => d.id === item.fabric_or_dress) : null;
                                const service = Array.isArray(services) ? services.find(s => s.id === item.tailorService) : null;

                                const dressPrice = parseFloat(dress?.discount_price) || 0;
                                const serviceCharge = parseFloat(service?.sell_price_per_unit) || 0;
                                const quantity = item.fabric_or_dress_quantity || 1;

                                // Calculate the subtotal (dress price * quantity + service charge)
                                const subtotal = (dressPrice * quantity) + serviceCharge;

                                return (
                                    <tr key={item.id} className='border-b'>

                                        <td className="px-4 py-2">
                                            <p>
                                                {new Date(item?.added_at).toLocaleDateString('en-GB', {
                                                    day: '2-digit',
                                                    month: 'short',
                                                    year: '2-digit',
                                                }).replace(/ /g, '-')}
                                            </p>
                                        </td>
                                        <td className="px-4 py-2">
                                            <h3>{dress?.name || " "}</h3>
                                        </td>
                                        <td className="text-center px-4 py-2">
                                            <span className="text-xl font-semibold">{quantity}</span>
                                        </td>
                                        <td className="text-right px-4 py-2">
                                            {/* Format the price to show 2 decimals */}
                                            {(dressPrice * quantity).toFixed(2)}
                                        </td>
                                        <td className="px-4 py-2">{service?.name}</td>
                                        <td className="text-right px-4 py-2">
                                            {/* Format the service charge to show 2 decimals */}
                                            {serviceCharge > 0 ? serviceCharge.toFixed(2) : '0.00'}
                                        </td>
                                        <td className="text-right px-4 py-2">
                                            {/* Show the subtotal with the addition of price and service charge */}
                                            {subtotal.toFixed(2)}
                                        </td>
                                        <td className="text-center px-4 py-2">
                                            <button className="text-red-500" onClick={() => handleRemoveItem(item.id)}>
                                                <MdRemoveShoppingCart />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })
                        }

                        <tr className='mt-5 font-bold text-heading'>
                            <td colSpan={4} className="px-4 py-2">Total</td>
                            <td className="px-12 py-2"> </td>
                            <td className="px-12 py-2"> </td>
                            <td className="text-right px-4 py-2">{total.toFixed(2)}</td>
                        </tr>

                    </tbody>
                </table>

                <div className='flex items-center justify-end gap-5 pt-10'>
                     
                    <button className='font-semibold border border-gray-200 px-8 py-2 rounded-md'>
                        <Link to='/dresses'>Continue Shopping</Link>
                    </button>
                    <Link to='http://127.0.0.1:8000/payments/'>
                        <button type="submit" className="bg-violet-500 font-semibold text-white px-8 py-2 rounded-md">
                            Complete Order
                        </button>
                    </Link>
                </div>
            </section>
        </section>
    );
};

export default Cart;
