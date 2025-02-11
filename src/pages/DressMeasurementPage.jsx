import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';  // For making API requests
import { AuthContext } from '../contexts/AuthContext';
import Sidebar from '../components/Sidebar';

const DressMeasurementPage = () => {
  const { user } = useContext(AuthContext);  // Get user from context
  const token = localStorage.getItem('token');  // Get token from local storage (for API authentication)

  const [measurements, setMeasurements] = useState(null);  // To store the fetched measurements
  const [dressCategories, setDressCategories] = useState([]);  // To store the available dress categories
  const [isLoading, setIsLoading] = useState(true);  // To track loading state
  const [error, setError] = useState(null);  // To store errors (if any)
  const [successMessage, setSuccessMessage] = useState(null);  // To store success message

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the measurements using the fitFinder ID
        const measurementsResponse = await axios.get(`https://tailor-hub-backend.vercel.app/measurements/dress_measurements/?fit_finder=${user.fitFinder}`, {
          headers: {
            'Authorization': `Token ${token}`,  // Add the Authorization header with the token
          },
        });

        if (measurementsResponse.status === 200) {
          if (measurementsResponse.data.length > 0) {
            setMeasurements(measurementsResponse.data[0]); // Assuming there is a single measurement for the user
          } else {
            setMeasurements(null); // No data, so set to null to trigger "Add first measurement" message
          }
          setIsLoading(false);
        } else {
          setError('Failed to fetch measurements');
          setIsLoading(false);
        }

        // Fetch the available dress categories
        const categoryResponse = await axios.get('https://tailor-hub-backend.vercel.app/measurements/dress_category/');
        if (categoryResponse.status === 200) {
          setDressCategories(categoryResponse.data);  // Set dress categories
        } else {
          setError('Failed to fetch dress categories');
        }
      } catch (err) {
        setError('Failed to fetch data');
        setIsLoading(false);
      }
    };

    if (user && user.fitFinder) {
      fetchData();
    }
  }, [user, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Ensure all fields are correctly parsed and handle the necessary null checks
    const updatedMeasurements = {
      ...measurements,
      dress_long: measurements.dress_long ? parseInt(measurements.dress_long) : null,  // Convert to integer or null
      chest_or_hip: measurements.chest_or_hip ? parseInt(measurements.chest_or_hip) : null,  // Convert to integer or null
      hand_pocket_length: measurements.hand_pocket_length ? parseInt(measurements.hand_pocket_length) : null,  // Convert to integer or null
      hand_pant_start: measurements.hand_pant_start ? parseInt(measurements.hand_pant_start) : null,  // Convert to integer or null
      hand_pant_end: measurements.hand_pant_end ? parseInt(measurements.hand_pant_end) : null,  // Convert to integer or null
      neckband: measurements.neckband ? parseInt(measurements.neckband) : null,  // Convert to integer or null
      dress_type: measurements.dress_type || null,  // Use the dress type or null if missing
      fit_finder: user.fitFinder,  // Keep the fit_finder from the user state
    };
  
    console.log("Updated Measurements to Send:", updatedMeasurements);  // Log the data for debugging
  
    if (!measurements || !measurements.id) {
      // If there is no ID, perform POST operation
      try {
        const response = await axios.post(
          `https://tailor-hub-backend.vercel.app/measurements/dress_measurements/`,
          updatedMeasurements,
          {
            headers: {
              'Authorization': `Token ${token}`,
            },
          }
        );
  
        if (response.status === 201) {
          setSuccessMessage('Measurements added successfully!');
          setError(null);  // Clear any previous errors
          setMeasurements(response.data);  // Update state with the new data
        } else {
          setSuccessMessage(null);
          setError('Failed to add measurements');
        }
      } catch (err) {
        setSuccessMessage(null);
        console.error('Error adding measurements:', err.response || err);  // More detailed logging
        setError('Error adding measurements');
      }
    } else {
      // If the measurements exist and have an ID, perform PUT operation
      try {
        const response = await axios.put(
          `https://tailor-hub-backend.vercel.app/measurements/dress_measurements/${measurements.id}/`,
          updatedMeasurements,  // Ensure you're sending the correct object
          {
            headers: {
              'Authorization': `Token ${token}`,
            },
          }
        );
  
        if (response.status === 200) {
          setSuccessMessage('Measurements updated successfully!');
          setError(null);  // Clear any previous errors
          setMeasurements(response.data);  // Update state with the updated data from the backend
        } else {
          setSuccessMessage(null);
          setError('Failed to update measurements');
        }
      } catch (err) {
        setSuccessMessage(null);
        console.error('Error updating measurements:', err.response || err);  // Log detailed error
        setError('Error updating measurements');
      }
    }
  };
  
  
  

  // Handle changes in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setMeasurements((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // If data is loading, show a loading spinner
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // If there is an error while fetching data, show an error message
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className='flex'>
      <Sidebar />

      <section className="m-auto rounded-lg shadow shadow-violet-200 my-20 p-10 max-w-screen-lg w-full">
        <div className="flex flex-col gap-5 relative">
          <h2 className="text-heading text-center text-3xl font-bold">Update Your Dress Measurements</h2>
          <p className="text-center">Please update your measurements below</p>

          {/* Success or Error Message */}
          {successMessage && (
            <div className="bg-green-200 text-green-800 p-4 rounded-lg mb-5">
              {successMessage}
            </div>
          )}
          {error && (
            <div className="bg-red-200 text-red-800 p-4 rounded-lg mb-5">
              {error}
            </div>
          )}

          {/* If no data (first-time update) */}
          {measurements === null ? (
            <div className="text-center mb-5">
              <p className="text-gray-600">It looks like you don't have any measurements yet. Please add your measurements.</p>
              <button
                onClick={() => setMeasurements({})}  // Set empty measurements to start adding data
                className="bg-heading text-white px-5 py-2 rounded mt-3"
              >
                Add Your Measurements
              </button>
            </div>
          ) : (
            // If data exists, show the form with pre-filled values
            <form onSubmit={handleSubmit}>
              <div className="flex gap-5">
                <div className="w-1/2 m-5">
                  <h6 className="text-[20px] font-bold text-heading">Dress Measurements</h6>

                  {/* Dress Length Input */}
                  <div className="flex flex-col mb-5">
                    <label className="font-semibold text-sm" htmlFor="dress_long">Dress Length</label>
                    <input
                      type="number"
                      name="dress_long"
                      value={measurements.dress_long || ''}
                      onChange={handleChange}
                      placeholder="Dress Length"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-heading focus:outline-none focus:ring-0 focus:border-heading peer"
                    />
                  </div>

                  {/* Chest or Hip Input */}
                  <div className="flex flex-col mb-5">
                    <label className="font-semibold text-sm" htmlFor="chest_or_hip">Chest or Hip</label>
                    <input
                      type="number"
                      name="chest_or_hip"
                      value={measurements.chest_or_hip || ''}
                      onChange={handleChange}
                      placeholder="Chest or Hip Measurement"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-heading focus:outline-none focus:ring-0 focus:border-heading peer"
                    />
                  </div>

                  {/* Dress Type Select */}
                  <div className="flex flex-col mb-5">
                    <label className="font-semibold text-sm" htmlFor="dress_type">Dress Type</label>
                    <select
                      name="dress_type"
                      value={measurements.dress_type || null}  // Default to null
                      onChange={handleChange}
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-heading focus:outline-none focus:ring-0 focus:border-heading peer"
                    >
                      <option value={null}>Select Dress Type</option>
                      {dressCategories.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                    </select>
                  </div>

                  {/* Neckband Input */}
                  <div className="flex flex-col mb-5">
                    <label className="font-semibold text-sm" htmlFor="neckband">Neckband</label>
                    <input
                      type="number"
                      name="neckband"
                      value={measurements.neckband || ''}
                      onChange={handleChange}
                      placeholder="Neckband Measurement"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-heading focus:outline-none focus:ring-0 focus:border-heading peer"
                    />
                  </div>
                </div>
                <div className='w-1/2 m-5'>
                  <h6 className="text-[20px] font-bold text-heading">Additional Measurements</h6> 

                  {/* Hand Pocket Length Input */}
                  <div className="flex flex-col mb-5">
                    <label className="font-semibold text-sm" htmlFor="hand_pocket_length">Hand Pocket Length</label>
                    <input
                      type="number"
                      name="hand_pocket_length"
                      value={measurements.hand_pocket_length || ''}
                      onChange={handleChange}
                      placeholder="Hand Pocket Length"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-heading focus:outline-none focus:ring-0 focus:border-heading peer"
                    />
                  </div>

                  {/* Hand Pant Start Input */}
                  <div className="flex flex-col mb-5">
                    <label className="font-semibold text-sm" htmlFor="hand_pant_start">Hand Pant Start</label>
                    <input
                      type="number"
                      name="hand_pant_start"
                      value={measurements.hand_pant_start || ''}
                      onChange={handleChange}
                      placeholder="Hand Pant Start"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-heading focus:outline-none focus:ring-0 focus:border-heading peer"
                    />
                  </div>

                  {/* Hand Pant End Input */}
                  <div className="flex flex-col mb-5">
                    <label className="font-semibold text-sm" htmlFor="hand_pant_end">Hand Pant End</label>
                    <input
                      type="number"
                      name="hand_pant_end"
                      value={measurements.hand_pant_end || ''}
                      onChange={handleChange}
                      placeholder="Hand Pant End"
                      className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-heading focus:outline-none focus:ring-0 focus:border-heading peer"
                    />
                  </div>

                  {/* Submit Button */}
                  <button type="submit" className="bg-heading text-white py-2 px-6 rounded">Submit</button>
                </div>
              </div>
            </form>

          )}
        </div>
      </section>
    </section>
  );
};

export default DressMeasurementPage;
