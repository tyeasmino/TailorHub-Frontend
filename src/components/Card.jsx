import React, { useEffect, useState } from 'react'
import { useCart } from '../contexts/cartContext';
import { TbCurrencyTaka, TbEye, TbShoppingCartMinus, TbShoppingCartPlus, TbShoppingCartOff } from "react-icons/tb";
import { Link } from 'react-router';
import axios from 'axios';

const Card = ({ dress }) => {
    const { cartList, addToCart, removeFromCart } = useCart();
    const [inCart, setInCart] = useState(false);

    const [categories, setCategories] = useState([]);
    const [categoryMap, setCategoryMap] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cartItem = cartList.find((item) => item.id == dress?.id)
        console.log('cartItems: ', cartItem);
        cartItem ? setInCart(true) : setInCart(false)
    }, [cartList, dress.id])


    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch categories data
                const categoriesResponse = await axios.get('https://tailor-hub-backend.vercel.app/fitMakers/categories/');
                setCategories(categoriesResponse.data);
                // Create a map of category IDs to names for fast lookup
                const newCategoryMap = categoriesResponse.data.reduce((acc, category) => {
                    acc[category.id] = category.name;
                    return acc;
                }, {});
                setCategoryMap(newCategoryMap);

                setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                console.error("Error fetching data", error);
                setLoading(false); // Set loading to false in case of error
            }
        };

        fetchData();
    }, []); // Empty dependency array means this runs once when the component mounts


    const getCategoryName = (categoryId) => {
        return categoryMap[categoryId] || "Common"; // Fallback to "Unknown Category" if not found
    };



    return (
        <div className="mx-3 shadow-lg group relative rounded-lg overflow-hidden bg-white">
            <div className="relative">
                <Link to={`/dresses/${dress.id}`}>
                    <img
                        className="w-full h-64 object-cover object-center transition-transform duration-300 group-hover:scale-105"
                        src={dress.image}
                        alt={dress.name}
                    />
                </Link>
                {/* Eye Icon */}
                <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Link to={`/dresses/${dress.id}`}>
                        <TbEye className="text-violet-500 text-2xl" />
                    </Link>
                </div>

                {
                    dress.is_best_seller ?
                        <div className="absolute top-4 right-4 bg-violet-500 px-3 py-2 text-white rounded-md text-md">
                            <h2>Best Seller</h2>
                        </div> : ""
                }
            </div>

            {/* Dress Details */}
            <div className="py-3 px-4">
                <h6 className="text-pink-600 group-hover:text-black font-semibold">{dress.name}</h6>
                <p className="text-gray-500 text-sm mt-1">{dress.description.slice(0, 50)}...</p> {/* Display brief description */}

                <div className="mt-3 flex items-center justify-between">
                    <span className="text-lg flex items-center font-semibold text-violet-500">
                        {dress.discount_price && dress.base_price > 0 ? (
                            <>
                                <span className="line-through text-gray-500">{dress.base_price}</span>
                                <span className="ml-2">{dress.discount_price}</span>
                            </>
                        ) : (
                            <span>{dress.discount_price || dress.base_price}</span>
                        )}
                        <TbCurrencyTaka />
                    </span>

                    <div className="flex items-center gap-1">
                        <span className="text-gray-500 text-xs">Category:</span>
                        <span className="text-gray-700 text-sm font-semibold">{getCategoryName(dress.category)}</span>
                    </div>
                </div>

                <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1">
                        <span className="text-gray-500 text-xs">Supplier:</span>
                        <span className="text-gray-700 text-sm font-semibold">{dress.supplier}</span>
                    </div>
                </div>
            </div>

            {/* Add to Cart & Cart Icon */}
            <div className="absolute bottom-3 right-3 flex gap-2 items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {dress.stock ?
                    <>
                        {!inCart &&
                            <TbShoppingCartPlus onClick={() => addToCart(dress)} className="text-2xl text-violet-500 cursor-pointer" />
                        }

                        {inCart &&
                            <TbShoppingCartMinus onClick={() => removeFromCart(dress)} className="text-2xl text-violet-500 cursor-pointer" />
                        }
                    </>
                    :
                    <TbShoppingCartOff className="text-2xl text-violet-500 cursor-pointer" />
                }
            </div>
        </div>
    )
}

export default Card