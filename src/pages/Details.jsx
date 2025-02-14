import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { TbShoppingCartMinus, TbShoppingCartPlus, TbShoppingCartOff } from 'react-icons/tb';
import { useCart } from '../contexts/cartContext'; // Ensure the cart context is available
import { FaRegStar, FaStar } from 'react-icons/fa';
import { FaStarHalfStroke } from 'react-icons/fa6';
import { AuthContext } from '../contexts/AuthContext';

const Details = () => {
    const { user } = useContext(AuthContext);  // Get user from context
    const [dress, setDress] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [inCart, setInCart] = useState(false);
    const [selectedDressType, setSelectedDressType] = useState(''); // Track selected dress type
    const [dressCategories, setDressCategories] = useState([]); // Track the dress categories from the API
    const { id } = useParams();
    const token = localStorage.getItem('token'); // Get the token from local storage

    // Fetch dress details
    useEffect(() => {
        const fetchDressDetails = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`https://tailor-hub-backend.vercel.app/inventory/all_items/${id}/`);
                setDress(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching dress details:", error);
                setError("Error fetching the dress details. Please try again later.");
                setLoading(false);
            }
        };

        fetchDressDetails();
    }, [id]);

    // Fetch dress categories from the API
    useEffect(() => {
        const fetchDressCategories = async () => {
            try {
                const response = await axios.get('https://tailor-hub-backend.vercel.app/measurements/dress_category/');
                setDressCategories(response.data); // Set fetched categories
            } catch (error) {
                console.error('Error fetching dress categories:', error);
            }
        };

        fetchDressCategories();
    }, []);

 
    const handleAddToCart = async () => {
        if (!token) {
            alert('Please log in to add items to your cart');
            return;
        }
    
        // Find the selected dress category and its price from the categories
        const selectedCategory = dressCategories.find(
            (category) => category.slug === selectedDressType
        );
    
        const tailorServicePrice = selectedCategory ? selectedCategory.sell_price_per_unit : 0;
        const tailorServiceId = selectedCategory ? selectedCategory.id : null;
    
        // FitFinder is the logged-in user (use token to get user info)
        const fitFinderId = user.fitFinder; // You need to implement this helper function
    
        // Correct the fitMaker reference to fitmaker (based on API data)
        const fitMakerId = dress.fitmaker;  // Use dress.fitmaker directly (not dress.fitMaker)
    
        // Prepare cart data
        const cartData = {
            fit_finder: fitFinderId,  // Logged-in user
            fit_maker: fitMakerId,    // Correctly use dress.fitmaker
            fabric_or_dress: dress.id,  // The dress being added to the cart
            fabric_or_dress_quantity: 1,   
            tailorService: tailorServiceId,  // Selected tailor service (if any)
        };
    
        console.log('cartData: ', cartData);  // Check the data before sending
    
        try {
            const response = await axios.post(
                'http://127.0.0.1:8000/orders/mycart/',
                cartData,
                {
                    headers: {
                        'Authorization': `Token ${token}`,
                    },
                }
            );
    
            if (response.status === 201) {
                alert('Item Added to cartList.');
            }
        } catch (error) {
            console.error('Error adding item to cart:', error);
            alert('Failed to add item to cart. Please try again.');
        }
    };
    
    // Remove from cart handler
    const handleRemoveFromCart = async () => {
        removeFromCart(dress);
        setInCart(false);
    };

    // Handle Dress Type Change
    const handleDressTypeChange = (e) => {
        setSelectedDressType(e.target.value);
    };


    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <section className="max-w-screen-lg my-20 m-auto">
            {dress && (
                <>
                    <section className="flex items-center gap-10">
                        <div className="w-2/5 p-5">
                            <img
                                className="w-full overflow-hidden rounded-md object-cover h-full"
                                src={dress.image}
                                alt={dress.name}
                            />
                        </div>
                        <div className="w-3/5 p-5 flex flex-col gap-5">
                            <h1 className="text-3xl font-bold text-gray-600">{dress.name} - {dress.fitMaker} </h1>
                            <div className="flex gap-1 text-yellow-400">
                                <FaStar />
                                <FaStar />
                                <FaStar />
                                <FaStarHalfStroke />
                                <FaRegStar />
                            </div>
                            <div>
                                <del className="text-gray-400">${dress.base_price}</del>{' '}
                                <span className="text-violet-500 font-bold">${dress.discount_price || dress.base_price}</span>
                            </div>
                            <div className="text-gray-400">{dress.description}</div>

                            <div className="flex gap-10">
                                <div>
                                    <small className="text-gray-400">Type</small> <br />
                                    <strong>{dress.category}</strong>
                                </div>
                                <div>
                                    <small className="text-gray-400">Supplier</small> <br />
                                    <strong>{dress.supplier}</strong>
                                </div>
                            </div>

                            {/* Dress Type Selection */}
                            <div className="my-5 w-1/2">
                                <strong>Select Dress Type</strong>
                                <select
                                    value={selectedDressType}
                                    onChange={handleDressTypeChange}
                                    className="border p-2 mt-2 w-full"
                                >
                                    <option value="">Select a Dress Type</option>
                                    {/* Dynamically populate options from the API */}
                                    {dressCategories.map((category) => (
                                        <option key={category.id} value={category.slug}>
                                            {category.name} - {category.sell_price_per_unit}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Quantity and Add to Cart */}
                            <div className="flex gap-2 items-center">
                                {dress.stock ? (
                                    <>
                                        {!inCart ? (
                                            <button
                                                onClick={handleAddToCart}
                                                className="bg-violet-500 flex items-center gap-3 px-5 py-1 rounded-md text-white cursor-pointer"
                                            >
                                                <TbShoppingCartPlus /> Add to Cart
                                            </button>
                                        ) : (
                                            <button
                                                onClick={handleRemoveFromCart}
                                                className="bg-pink flex items-center gap-3 px-5 py-1 rounded-md text-white cursor-pointer"
                                            >
                                                <TbShoppingCartMinus /> Remove from Cart
                                            </button>
                                        )}
                                    </>
                                ) : (
                                    <button className="bg-pink flex items-center gap-3 px-5 py-1 rounded-md text-white cursor-not-allowed">
                                        <TbShoppingCartOff /> Out of Stock
                                    </button>
                                )}
                            </div>
                        </div>
                    </section>
                </>
            )}
        </section>
    );
};

export default Details;
