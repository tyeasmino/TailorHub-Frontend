import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../components/Card';

const FeaturedDress = () => {
    const [dresses, setDresses] = useState([]); // State to hold fetched dresses
    const [loading, setLoading] = useState(true); // Loading state
 
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch dresses data
                const dressesResponse = await axios.get('http://127.0.0.1:8000/inventory/all_items/?is_featured=true');
                setDresses(dressesResponse.data.results); // Set the results from API response
                setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                console.error("Error fetching data", error);
                setLoading(false); // Set loading to false in case of error
            }
        };

        fetchData();
    }, []);
    // If data is still loading, show a loading message
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <section className='max-w-screen-xl m-auto py-20'>
            <h2 className='text-heading text-center font-semibold text-3xl mb-10'>Featured Dress</h2>

            <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4'>
                {dresses?.map(dress => (
                    <article key={dress.id}>
                        <Card dress={dress} />
                    </article>
                ))}
            </div>
        </section>
    );
};

export default FeaturedDress;
