import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../components/Card'


const UpcomingDress = () => {
    const [dresses, setDresses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dressesResponse = await axios.get('http://127.0.0.1:8000/fitMakers/dresses/?is_upcoming=true');
                setDresses(dressesResponse.data);

                setLoading(false);
            } catch (error) {
                console.error("Error fetching data", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <section className='max-w-screen-xl m-auto py-20'>
            <h2 className='text-heading text-center font-semibold text-3xl mb-10'>Upcoming Dress</h2>

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

export default UpcomingDress;
