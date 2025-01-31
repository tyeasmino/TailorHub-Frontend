import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const FeaturedDress = () => {
    const [dresses, setDresses] = useState([]); // State to hold fetched dresses
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch dresses data
                const dressesResponse = await axios.get('https://tailor-hub-backend.vercel.app/inventory/all_items/?is_featured=true');
                setDresses(dressesResponse.data.results); // Set the results from API response
                setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                console.error("Error fetching data", error);
                setLoading(false); // Set loading to false in case of error
            }
        };

        fetchData();
    }, []);


    var settings = {
        dots: false,
        infinite: true,
        speed: 2000,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true,
        // autoplaySpeed: 2000,


        responsive: [
            {
                breakpoint: 991,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll:3,
                    infinite: true,
                    dots: false,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <section className='max-w-screen-xl m-auto py-20'>
            <h2 className='text-heading text-center font-semibold text-3xl mb-10'>Featured Dress</h2>

            <div className=''>
                <Slider {...settings}>
                    {dresses?.map(dress => (
                        <article key={dress.id}>
                            <Card dress={dress} />
                        </article>
                    ))}

                </Slider>

            </div>
        </section>
    );
};

export default FeaturedDress;
