import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';  // Import useParams to read URL params
import axios from 'axios';  // Import axios for making API requests
import { FaStar } from "react-icons/fa6";
import { FaStarHalfStroke } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa6";
import { GiSelfLove } from "react-icons/gi";

const DetailsPage = () => { 
  const [dress, setDress] = useState(null); // State to hold the dress data
  const [quantity, setQuantity] = useState(0); // Quantity state for the cart
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const { id } = useParams(); // Use 'id' to fetch the correct dress based on the URL parameter

  // Fetch the specific dress details based on the id
  useEffect(() => {
    const fetchDressDetails = async () => {
      try {
        setLoading(true); // Set loading to true when fetching starts
        const response = await axios.get(`http://127.0.0.1:8000/fitMakers/dresses/${id}/`);
        setDress(response.data);  // Set the dress data in the state
        setLoading(false); // Set loading to false when the data is fetched
      } catch (error) {
        console.error("Error fetching dress details:", error);
        setError("Error fetching the dress details. Please try again later."); // Set an error message
        setLoading(false); // Set loading to false when there's an error
      }
    };

    fetchDressDetails();
  }, [id]); // Fetch the data again if the id changes

  // Handle quantity increase and decrease
  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  // If loading, show loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  // If there's an error, display the error message
  if (error) {
    return <div>{error}</div>;
  }

  // If dress data is available, render it
  return (
    <section className="max-w-screen-lg my-20 m-auto">
      {dress && (
        <section className="flex items-center gap-10">
          <div className="w-2/5 p-5">
            <img
              className="w-full overflow-hidden rounded-md object-cover h-full"
              src={dress.image}  // Use the fetched dress image
              alt={dress.name}  // Use the dress name for alt text
            />
          </div>
          <div className="w-3/5 p-5 flex flex-col gap-5">
            <h1 className="text-3xl font-bold text-gray-600">{dress.name}</h1>
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
                <strong>{dress.supplier_name}</strong>
              </div>
            </div>

            {/* Fabric Color */}
            <div>
              <strong>Fabric Color</strong>
              <span className="flex gap-1">
                <input type="radio" name="radio-1" className="radio radio-sm" defaultChecked />
                <input type="radio" name="radio-1" className="radio radio-sm radio-primary" />
                <input type="radio" name="radio-1" className="radio radio-sm radio-secondary" />
                <input type="radio" name="radio-1" className="radio radio-sm radio-accent" />
              </span>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex gap-2 items-center">
              <div>
                <div>
                  <span onClick={handleDecrease} className="border text-gray-400 cursor-pointer rounded-l-md px-3 py-1">-</span>
                  <span className="border px-8 py-1">{quantity}</span>
                  <span onClick={handleIncrease} className="border text-gray-400 cursor-pointer rounded-r-md px-3 py-1">+</span>
                </div>
              </div>
              <button className="bg-violet-500 px-5 py-1 rounded-md text-white cursor-pointer">Add to Cart</button>
              <GiSelfLove className="text-violet-500" />
            </div>
          </div>
        </section>
      )}
    </section>
  );
};

export default DetailsPage;
