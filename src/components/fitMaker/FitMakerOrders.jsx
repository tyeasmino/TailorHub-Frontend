import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

const FitMakerOrders = () => {
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

  const updateOrderStatus = (orderId, newStatus, order) => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('Authentication required');
      console.log('No authentication token found.');
      return;
    }

    // Set the updated order data (only the field you want to update)
    const updatedOrder = {
      order_status: newStatus,  // Update only the order status here
    };

    console.log('Sending PATCH request with data:', updatedOrder);  // Log the request data

    // Use PATCH to update only the order_status field
    axios.patch(`https://tailor-hub-backend.vercel.app/orders/myorder/${orderId}/`, updatedOrder, {
      headers: {
        'Authorization': `Token ${token}`,  // Send token in the Authorization header
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        // Log the success response
        console.log('Response from backend:', response.data);
        setOrders(prevOrders => prevOrders.map(order =>
          order.id === orderId ? { ...order, order_status: newStatus } : order
        ));
        
        // Now create the movement after updating the status
        if (newStatus === 'Completed') {
          updateOrderStatusAndCreateMovement(order);  // Call the function to create the inventory movement
        }
      })
      .catch(err => {
        // Log the error message and response from the backend
        console.error('Error updating order status:', err);  // Log error details
        if (err.response) {
          console.log('Backend error response:', err.response.data);  // Log the backend error response
        }
        setError('Error updating order status');
      });
  };

  // Function to update order status and create the inventory movement
  const updateOrderStatusAndCreateMovement = async (order) => {
    try {
      // Create the inventory movement
      const movementData = {
        inventory_item: order.fabric_OR_dress, // fabric_OR_dress from the order
        quantity: order.fabric_OR_dress_quantity, // fabric_OR_dress_quantity from the order
        movement_type: "Use", // Fixed as per your requirement
        date: new Date().toISOString().split('T')[0], // Today's date in YYYY-MM-DD format
        description: `For ${order.order_id}` // Description with the order ID
      };

      const movementResponse = await axios.post(
        'https://tailor-hub-backend.vercel.app/inventory/items_movements/',
        movementData,
        { headers: { 'Authorization': `Token ${token}` } }
      );

      // Log the response of movement creation
      console.log('Movement Created:', movementResponse.data);

    } catch (err) {
      console.error('Error creating movement:', err);
    }
  };

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

  return (
    <div className="w-11/12 md:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
      <h1 className="text-xl md:text-3xl font-bold text-gray-900 mb-6">Orders</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-6">
        {orders.map((order) => (
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
              {order.tailorService_name ? 
                <>
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Tailor Service Name:</strong> {order.tailorService_name}
                  </p>
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>Tailor Service Price:</strong> ${order.tailorService_price}
                  </p>
                </> 
                : <></>}
              <p className="text-sm text-gray-600 mb-2">
                <strong>Total Bill:</strong> ${order.total_bill}
              </p>
              {order.order_status === 'Processing' && <p className="text-sm text-gray-600 mb-2">
                <strong>Status:</strong> {order.order_status}
              </p>}
              {order.order_status === 'Completed' && <p className="text-sm mb-2">
                <strong>Status:</strong> <span className='text-green-500 font-bold '> {order.order_status} </span>
              </p>}
              {order.order_status === 'Delivered' && <p className="text-sm mb-2">
                <strong>Status:</strong> <span className='text-violet-600 font-bold'> {order.order_status} </span>
              </p>}

              {order.order_status === 'Processing' && (
                <button
                  onClick={() => updateOrderStatus(order.id, 'Completed', order)}
                  className="px-4 py-1 bg-green-400 text-white rounded-lg"
                >
                  Mark as Completed
                </button>
              )}

              {/* Show Mark as Delivered button if order is completed */}
              {order.order_status === 'Completed' && (
                <button
                  onClick={() => updateOrderStatus(order.id, 'Delivered', order)}
                  className="mt-2 px-4 py-1 bg-violet-400 text-white rounded-lg"
                >
                  Mark as Delivered
                </button>
              )}

            </div>
          </div>
        ))}
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

export default FitMakerOrders;
