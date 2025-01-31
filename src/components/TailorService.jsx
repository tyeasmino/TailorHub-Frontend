import React, { useEffect, useState } from 'react'

const TailorService = () => {
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
    const handleDressSelect = (dress) => {
        setSelectedDress(dress);
    };


    return (

        < div className="m-auto my-5" >
            <h3 className="text-xl font-semibold mb-3">Select a Dress Type (Optional) </h3>
            <table className="table-auto w-full text-left">
                <thead>
                    <tr className='border-b'>
                        <th className=" px-4 py-2">Select</th>
                        <th className=" px-4 py-2">Name</th>
                        <th className=" px-4 py-2">Price</th>
                    </tr>
                </thead>
                <tbody>
                    {dressCategories.map((dress) => (
                        <tr key={dress.id} className='border-b'>
                            <td className="px-4 py-2">
                                <input
                                    type="radio"
                                    name="dress_type"
                                    checked={selectedDress?.id === dress.id}
                                    onChange={() => handleDressSelect(dress)}
                                />
                            </td>
                            <td className="px-4 py-2">{dress.name}</td>
                            <td className="px-4 py-2">{dress.sell_price_per_unit}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    )
}

export default TailorService