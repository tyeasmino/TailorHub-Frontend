import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { FaTools } from "react-icons/fa";
import { IoBagCheck } from "react-icons/io5";
import { TbTruckDelivery } from "react-icons/tb";

const FitFinderOrders = () => {
  const [orders, setOrders] = useState([]);  // State to hold the fetched orders
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);  // Error state
  const [nextPage, setNextPage] = useState(null);  // Track the next page URL
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      setError('Authentication required');
      setLoading(false);
      return;
    }

    // Fetch orders for the logged-in fitFinder (initial load)
    axios.get('https://tailor-hub-backend.vercel.app/orders/myorder/', {
      headers: {
        'Authorization': `Token ${token}`  // Send token in the Authorization header
      }
    })
      .then(response => {
        setOrders(response.data.results);  // Set orders in the state
        setNextPage(response.data.next);  // Set the URL for the next page
        setLoading(false);  // Update loading state
      })
      .catch(err => {
        setError('Error fetching orders');
        setLoading(false);
      });
  }, [token]);

  // Function to fetch next page of orders
  const fetchNextPage = () => {
    if (nextPage) {
      setLoading(true);
      axios.get(nextPage, {
        headers: {
          'Authorization': `Token ${token}`  // Send token in the Authorization header
        }
      })
        .then(response => {
          setOrders(prevOrders => [...prevOrders, ...response.data.results]);  // Append new orders to existing ones
          setNextPage(response.data.next);  // Update the next page URL
          setLoading(false);  // Update loading state
        })
        .catch(err => {
          setError('Error fetching next page');
          setLoading(false);
        });
    }
  };

  // Show loading message while data is being fetched
  if (loading && !orders.length) {
    return <div className="text-center text-xl font-semibold py-10">Loading...</div>;
  }

  // Show error message if there is any issue
  if (error) {
    return <div className="text-center text-red-600 py-10">{error}</div>;
  }

  // Function to determine status step class
  const getStatusClass = (status, currentStatus) => {
    if (status === currentStatus) {
      return 'bg-violet-600 text-white';
    } else if (status === 'Completed' && currentStatus === 'Delivered') {
      return 'bg-green-600 text-white';
    } else if (status === 'Delivered' && currentStatus !== 'Completed') {
      return 'bg-gray-300 text-gray-500';
    }
    return 'bg-gray-300 text-gray-500';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Orders</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order.id} className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="px-4 py-3 bg-violet-100 flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">{order.order_id}</h3>
                <p className="text-sm text-gray-500">{format(new Date(order.created_at), 'MMMM dd, yyyy')}</p>
              </div>
              <div className="px-6 py-4">
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Fabric/Dress Name:</strong> {order.fabric_OR_dress_name}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Fabric/Dress Quantity:</strong> {order.fabric_OR_dress_quantity}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Fabric/Dress Price:</strong> ${order.fabric_OR_dress_price}
                </p>
                {order.tailorService_name && (
                  <>
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>Tailor Service Name:</strong> {order.tailorService_name}
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>Tailor Service Price:</strong> ${order.tailorService_price}
                    </p>
                  </>
                )}
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Total Bill:</strong> ${order.total_bill}
                </p>

                {/* Order Status Tracker */}
                <div className="mt-4">
                  <h4 className="font-semibold text-gray-900">Order Status</h4>
                  <div className="flex items-center space-x-4">
                    {['Processing', 'Completed', 'Delivered'].map(status => (
                      <div key={status} className={`px-3 py-1 flex items-center gap-1 rounded-full text-sm text-center ${getStatusClass(status, order.order_status)}`}>
                        {status === 'Processing' && <span><FaTools className='text-[14px]' /></span>}
                        {status === 'Completed' && <span><IoBagCheck className='text-[18px]' /></span>}
                        {status === 'Delivered' && <span><TbTruckDelivery className='text-[18px]' /></span>}
                        <div>{status}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-xl font-semibold py-10">No orders found</div>
        )}
      </div>

      {/* Load next page if available */}
      {nextPage && (
        <div className="mt-6 text-center">
          <button
            onClick={fetchNextPage}
            disabled={loading}
            className="inline-flex items-center px-6 py-3 text-white bg-violet-600 hover:bg-violet-700 focus:ring-4 focus:ring-violet-300 rounded-lg"
          >
            {loading ? 'Loading next page...' : 'Load More Orders'}
          </button>
        </div>
      )}
    </div>
  );
};

export default FitFinderOrders;
