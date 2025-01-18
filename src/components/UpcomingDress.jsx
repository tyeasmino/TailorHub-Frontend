import React, { useEffect, useState } from 'react';
import { TbCurrencyTaka } from "react-icons/tb";
import { TbShoppingCartPlus } from "react-icons/tb";
import { TbEye } from "react-icons/tb";
import axios from 'axios'; // Import axios for API requests
import { Link } from 'react-router-dom'; // Correct routing package

const UpcomingDress = () => {
    const [dresses, setDresses] = useState([]); // State to hold fetched dresses
    const [categories, setCategories] = useState([]); // State to hold fetched categories
    const [categoryMap, setCategoryMap] = useState({}); // Map to optimize category lookup
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state for handling errors

    // Fetch dresses and categories data from API
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch dresses data
                const dressesResponse = await axios.get('http://127.0.0.1:8000/fitMakers/dresses/?is_upcoming=true');
                setDresses(dressesResponse.data);

                // Fetch categories data
                const categoriesResponse = await axios.get('http://127.0.0.1:8000/fitMakers/categories/');
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
                setError("An error occurred while fetching data. Please try again later.");
                setLoading(false); // Set loading to false in case of error
            }
        };

        fetchData();
    }, []); // Empty dependency array means this runs once when the component mounts

    // If data is still loading, show a loading message
    if (loading) {
        return <div>Loading...</div>;
    }

    // If there was an error, show the error message
    if (error) {
        return <div>{error}</div>;
    }

    // Function to get the category name by ID from the categoryMap
    const getCategoryName = (categoryId) => {
        return categoryMap[categoryId] || "Unknown Category"; // Fallback to "Unknown Category" if not found
    };

    return (
        <section className='max-w-screen-xl m-auto py-20'>
            <h2 className='text-heading text-center font-semibold text-3xl mb-10'>Upcoming Dress</h2>

            <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {dresses.map(dress => (
                    <div key={dress.id} className="shadow-lg group relative rounded-lg overflow-hidden bg-white">
                        {/* Dress Image */}
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
                                    <TbEye className="text-white text-2xl" />
                                </Link>
                            </div>
                        </div>

                        {/* Dress Details */}
                        <div className="py-3 px-4">
                            <h6 className="text-pink-600 group-hover:text-black font-semibold">{dress.name}</h6>
                            <p className="text-gray-500 text-sm mt-1">{dress.description.slice(0, 50)}...</p> {/* Display brief description */}

                            <div className="mt-3 flex items-center justify-between">
                                <span className="text-lg flex items-center font-semibold text-violet-500">
                                    <TbCurrencyTaka /> {dress.discount_price || dress.base_price}
                                </span>

                                <div className="flex items-center gap-1">
                                    <span className="text-gray-500 text-xs">Category:</span>
                                    <span className="text-gray-700 text-sm font-semibold">{getCategoryName(dress.category)}</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-2">
                                <div className="flex items-center gap-1">
                                    <span className="text-gray-500 text-xs">Supplier:</span>
                                    <span className="text-gray-700 text-sm font-semibold">{dress.supplier_name}</span>
                                </div>
                            </div>
                        </div>

                        {/* Add to Cart & Cart Icon */}
                        <div className="absolute bottom-3 right-3 flex gap-2 items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <TbShoppingCartPlus className="text-2xl text-violet-500 cursor-pointer" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default UpcomingDress;
