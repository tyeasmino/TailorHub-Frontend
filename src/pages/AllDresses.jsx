import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Card from '../components/Card';

const AllDresses = () => {
    const [dresses, setDresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [nextPage, setNextPage] = useState(null);
    const [previousPage, setPreviousPage] = useState(null);
    const [currentPage, setCurrentPage] = useState(1); // Default to first page
    const location = useLocation();
    const navigate = useNavigate();

    // Function to fetch data based on the current page
    const fetchData = async (url) => {
        try {
            const response = await axios.get(url);
            setDresses(response.data.results);
            setNextPage(response.data.next);
            setPreviousPage(response.data.previous);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data", error);
            setLoading(false);
        }
    };

    // Handle initial load of page based on URL params
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const pageFromUrl = searchParams.get('page') || 1;
        setCurrentPage(Number(pageFromUrl));

        // Fetch data for the current page
        const url = `https://tailor-hub-backend.vercel.app/inventory/all_items/?page=${pageFromUrl}`;
        fetchData(url);
    }, [location.search]);

    // Function to handle page change when Prev/Next is clicked
    const handlePageChange = (page) => {
        let newUrl = `https://tailor-hub-backend.vercel.app/inventory/all_items/?page=${page}`;
        
        if (page === 'next' && nextPage) {
            newUrl = nextPage;
            setCurrentPage(currentPage + 1);
        } else if (page === 'prev' && previousPage) {
            newUrl = previousPage;
            setCurrentPage(currentPage - 1);
        } else if (typeof page === 'number') {
            newUrl = `https://tailor-hub-backend.vercel.app/inventory/all_items/?page=${page}`;
            setCurrentPage(page);
        }

        // Update the URL with the new page
        navigate(`?page=${page}`, { replace: true });

        fetchData(newUrl);
    };

    if (loading) {
        return <div className='w-32 h-32 flex items-center justify-center m-auto my-64'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect fill="#6D28D9" stroke="#6D28D9" stroke-width="15" width="30" height="30" x="25" y="50"><animate attributeName="y" calcMode="spline" dur="0.6" values="50;120;50;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate></rect><rect fill="#6D28D9" stroke="#6D28D9" stroke-width="15" width="30" height="30" x="85" y="50"><animate attributeName="y" calcMode="spline" dur="0.6" values="50;120;50;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate></rect><rect fill="#6D28D9" stroke="#6D28D9" stroke-width="15" width="30" height="30" x="145" y="50"><animate attributeName="y" calcMode="spline" dur="0.6" values="50;120;50;" keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate></rect></svg>
        </div>;
    }

    return (
        <section className="max-w-screen-2xl p-20 m-auto flex flex-col gap-10">
            <div className='font-semibold'>
                <h1 className='text-heading text-center font-semibold text-3xl mb-10'>All Dresses</h1>
            </div>

            <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4'>
                {dresses?.map(dress => (
                    <article key={dress.id}>
                        <Card dress={dress} />
                    </article>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between mt-8 items-center">
                {/* Previous Button */}
                <button
                    onClick={() => handlePageChange('prev')}
                    disabled={!previousPage}
                    className={`px-4 py-2 bg-gray-500 text-white rounded-md ${!previousPage ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    Prev
                </button>

                {/* Next Button */}
                <button
                    onClick={() => handlePageChange('next')}
                    disabled={!nextPage}
                    className={`px-4 py-2 bg-gray-500 text-white rounded-md ${!nextPage ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    Next
                </button>
            </div>
        </section>
    );
};

export default AllDresses;
