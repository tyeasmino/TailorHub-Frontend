import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';  
import axios from 'axios';  
import { FaStar } from "react-icons/fa6";
import { FaStarHalfStroke } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa6"; 
import { useCart } from '../contexts/cartContext';
import { TbShoppingCartMinus, TbShoppingCartPlus } from 'react-icons/tb';

const DetailsPage = () => {
  const [dress, setDress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { cartList, addToCart, removeFromCart } = useCart();
  const [inCart, setInCart] = useState(false);
  const { id } = useParams();

  // Fetch dress details
  useEffect(() => {
    const fetchDressDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://127.0.0.1:8000/inventory/all_items/${id}/`);
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

  // Check if the dress is in the cart
  useEffect(() => {
    if (dress) {
      const cartItem = cartList.find((item) => item.id === dress.id);
      setInCart(cartItem ? true : false);
      console.log('inCart state:', cartItem ? true : false); // Debugging line to check state
    }
  }, [cartList, dress]);

  // Add to cart handler
  const handleAddToCart = () => {
    console.log('Adding to cart');
    addToCart(dress);
    setInCart(true);  // Update inCart state to show remove button
  };

  // Remove from cart handler
  const handleRemoveFromCart = () => {
    console.log('Removing from cart');
    removeFromCart(dress);
    setInCart(false);  // Update inCart state to show add button
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className="max-w-screen-lg my-20 m-auto">
      {dress && (
        <section className="flex items-center gap-10">
          <div className="w-2/5 p-5">
            <img
              className="w-full overflow-hidden rounded-md object-cover h-full"
              src={dress.image}
              alt={dress.name}
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
                <strong>{dress.supplier}</strong>
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
              {/* Add to Cart & Cart Icon */}
              <div className=" bottom-3 right-3 flex gap-2 items-center  transition-opacity duration-300">
                {!inCart ? (
                  <button onClick={handleAddToCart} className="bg-violet-500 flex items-center gap-3 px-5 py-1 rounded-md text-white cursor-pointer">
                    <TbShoppingCartPlus /> Add to Cart
                  </button>
                ) : (
                  <button onClick={handleRemoveFromCart} className="bg-pink flex items-center gap-3 px-5 py-1 rounded-md text-white cursor-pointer">
                    <TbShoppingCartMinus /> Remove from Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </section>
  );
};

export default DetailsPage;
