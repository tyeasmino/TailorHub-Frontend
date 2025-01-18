import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Card from '../components/Card';


const AllDresses = () => {
    const [dresses, setDresses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch dresses data
                const dressesResponse = await axios.get('http://127.0.0.1:8000/fitMakers/dresses/');
                setDresses(dressesResponse.data);

                setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                console.error("Error fetching data", error);
                setLoading(false); // Set loading to false in case of error
            }
        };

        fetchData();
    }, []); // Empty dependency array means this runs once when the component mounts




    return (
        <section className="max-w-screen-2xl p-20 m-auto flex flex-col gap-10">
            <div className='font-semibold'>
                <h1 className='text-2xl'>All Dresses</h1>
            </div>

            <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4'>
                {dresses?.map(dress => (
                    <article key={dress.id}>
                        <Card dress={dress} />
                    </article>
                ))}
            </div>
        </section>
    )
}

export default AllDresses