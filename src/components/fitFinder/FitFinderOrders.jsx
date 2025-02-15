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



  const getStatusClass = (status, currentStatus) => {
    // Determine if this status is active or past
    const statusOrder = ['Processing', 'Completed', 'Delivered'];
    const currentIndex = statusOrder.indexOf(currentStatus);
    const statusIndex = statusOrder.indexOf(status);

    return statusIndex <= currentIndex ? 'text-violet-500' : 'text-gray-500';
  };

  // const getLineClass = (status, currentStatus) => {
  //   // Determine if this line should be active
  //   const statusOrder = ['Processing', 'Completed', 'Delivered'];
  //   const currentIndex = statusOrder.indexOf(currentStatus);
  //   const statusIndex = statusOrder.indexOf(status);

  //   return statusIndex < currentIndex ? 'bg-violet-500' : 'bg-gray-300';
  // };

  const getLineClass = (lineEndStatus, currentStatus) => {
    // Define order of statuses
    const statusOrder = ['Processing', 'Completed', 'Delivered'];
    const currentIndex = statusOrder.indexOf(currentStatus);
    const lineEndIndex = statusOrder.indexOf(lineEndStatus);

    // Line should be violet if the current status is ahead of or at the line's end
    return currentIndex >= lineEndIndex ? 'bg-violet-500' : 'bg-gray-300';
  };


  const getVisibleText = (currentStatus) => {
    if (currentStatus === 'Processing') return 'Processing';
    if (currentStatus === 'Completed') return 'Completed';
    if (currentStatus === 'Delivered') return 'Delivered';
    return '';
  };




  // Show loading message while data is being fetched
  if (loading && !orders.length) {
    return <div className="text-center text-xl font-semibold py-10">Loading...</div>;
  }

  // Show error message if there is any issue
  if (error) {
    return <div className="text-center text-red-600 py-10">{error}</div>;
  }



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

                <div className="mt-4">
                  <h4 className="font-semibold text-gray-900">Order Status</h4>

                  <div className="relative flex items-center justify-between w-full mt-4">

                    {/* Line between Processing & Completed */}
                    <div className={`absolute top-1/2 left-10 w-[150px] h-0.5 transform -translate-y-1/2 ${getLineClass('Completed', order.order_status)}`}></div>

                    {/* Line between Completed & Delivered */}
                    <div className={`absolute top-1/2 left-[180px] w-[120px] h-0.5 transform -translate-y-1/2 ${getLineClass('Delivered', order.order_status)}`}></div>

                    {/* Processing */}
                    <div className="flex flex-col items-center w-1/3">
                      <div className={`w-10 h-10 flex items-center justify-center rounded-full ${getStatusClass('Processing', order.order_status)}`}>
                        <FaTools className="text-2xl" />
                      </div>
                      {order.order_status === 'Processing' && <span className="text-xs mt-2 text-violet-500">Processing</span>}
                    </div>

                    {/* Completed */}
                    <div className="flex flex-col items-center w-1/3">
                      <div className={`w-10 h-10 flex items-center justify-center rounded-full ${getStatusClass('Completed', order.order_status)}`}>
                        <IoBagCheck className="text-2xl" />
                      </div>
                      {order.order_status === 'Completed' && <span className="text-xs mt-2 text-violet-500">Completed</span>}
                    </div>

                    {/* Delivered */}
                    <div className="flex flex-col items-center w-1/3">
                      <div className={`w-10 h-10 flex items-center justify-center rounded-full ${getStatusClass('Delivered', order.order_status)}`}>
                        <TbTruckDelivery className="text-2xl" />
                      </div>
                      {order.order_status === 'Delivered' && <span className="text-xs mt-2 text-violet-500">Delivered</span>}
                    </div>

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
