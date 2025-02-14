// TailorService.js
import React, { useEffect, useState } from 'react';

const TailorService = ({ onDressTypeSelect }) => {
    const [dressCategories, setDressCategories] = useState([]);
    const [selectedDress, setSelectedDress] = useState(null);

    // Fetch dress categories from the API
    useEffect(() => {
        const fetchDressCategories = async () => {
            try {
                const response = await fetch('https://tailor-hub-backend.vercel.app/measurements/dress_category/');
                const data = await response.json();
                setDressCategories(data);
            } catch (error) {
                console.error('Error fetching dress categories:', error);
            }
        };

        fetchDressCategories();
    }, []);

    // Handle dress selection
    const handleDressSelect = (event) => {
        const selectedId = event.target.value;
        const selectedDress = dressCategories.find((dress) => dress.id === selectedId);
        setSelectedDress(selectedDress);
        // Pass selected dress to parent component
        onDressTypeSelect(selectedDress); // Notify the parent component of the selection
    };

    return (
        <div className="m-auto my-5">
            <h3 className="text-xl font-semibold mb-3">Select a Dress Type (Optional)</h3>
            <div className="mb-3">
                <label htmlFor="dress-select" className="block mb-2 text-sm font-medium">
                    Choose a Dress
                </label>
                <select
                    id="dress-select"
                    className="border p-2 w-full"
                    value={selectedDress ? selectedDress.id : ''}
                    onChange={handleDressSelect}
                >
                    <option value="">Select a Dress Type</option>
                    {dressCategories.map((dress) => (
                        <option key={dress.id} value={dress.id}>
                            {dress.name} - {dress.sell_price_per_unit}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default TailorService;
