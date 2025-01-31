import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios'; // For making API requests
import { AuthContext } from '../contexts/AuthContext';
import Sidebar from '../components/Sidebar';

const DressMeasurementPage = () => {
  const { user } = useContext(AuthContext);  // Get user from context
  const token = localStorage.getItem('token');  // Get token from local storage (for API authentication)

  const [measurements, setMeasurements] = useState(null);  // To store the fetched measurements
  const [isLoading, setIsLoading] = useState(true);  // To track loading state
  const [error, setError] = useState(null);  // To store errors (if any)
  const [successMessage, setSuccessMessage] = useState(null);  // To store success message

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the measurements using the fitFinder ID
        const response = await axios.get(`https://tailor-hub-backend.vercel.app/measurements/dress_measurements/?fit_finder=${user.fitFinder}`, {
          headers: {
            'Authorization': `Token ${token}`,  // Add the Authorization header with the token
          },
        });
        if (response.status === 200) {
          setMeasurements(response.data[0]); // Assuming there is a single measurement for the user
          setIsLoading(false);
        } else {
          setError('Failed to fetch measurements');
          setIsLoading(false);
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

    if (!measurements) return;

    try {
      // Exclude fit_finder from the form data because it's auto-filled
      const { fit_finder, ...updatedData } = measurements;

      // Send the updated measurements to the server
      const response = await axios.put(
        `https://tailor-hub-backend.vercel.app/measurements/dress_measurements/${measurements.id}/`,  // URL for updating
        { ...updatedData, fit_finder: user.fitFinder },  // Add fit_finder from user context
        {
          headers: {
            'Authorization': `Token ${token}`,  // Add the Authorization header with the token
          },
        }
      );

      if (response.status === 200) {
        setSuccessMessage('Measurements updated successfully!');
        setError(null);  // Clear any previous errors
      } else {
        setSuccessMessage(null);
        setError('Failed to update measurements');
      }
    } catch (err) {
      setSuccessMessage(null);
      setError('Error updating measurements');
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

      <section className=" m-auto shadow my-20 p-10 max-w-screen-lg w-full">
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

                {/* Hand Pocket Length */}
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
              </div>

              <div className="w-1/2 m-5">
                <h6 className="text-[20px] font-bold text-heading">Additional Details</h6>

                {/* Hand Pant Start */}
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

                {/* Hand Pant End */}
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
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex items-end justify-end mx-5">
              <button className="bg-heading px-5 py-2 text-white rounded" type="submit">Update Measurements</button>
            </div>
          </form>
        </div>
      </section>
    </section>


  );
};

export default DressMeasurementPage;
