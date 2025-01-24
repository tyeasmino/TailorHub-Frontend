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
    const [totalPages, setTotalPages] = useState(1); // To keep track of the total pages
    const location = useLocation();
    const navigate = useNavigate();

    // Function to fetch the data for a given page
    const fetchData = async (url) => {
        try {
            const dressesResponse = await axios.get(url);
            setDresses(dressesResponse.data.results);
            setNextPage(dressesResponse.data.next);
            setPreviousPage(dressesResponse.data.previous);

            // Calculate the total number of pages based on the count and page size
            const totalPages = Math.ceil(dressesResponse.data.count / 2); // Adjust page size to 2 for testing
            setTotalPages(totalPages);

            setLoading(false);
        } catch (error) {
            console.error("Error fetching data", error);
            setLoading(false);
        }
    };

    // Handle the initial load of the page
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const pageFromUrl = searchParams.get('page') || 1;
        setCurrentPage(Number(pageFromUrl));

        const url = `http://127.0.0.1:8000/inventory/all_items/?page=${pageFromUrl}`;
        fetchData(url);
    }, [location.search]);

    // Function to handle pagination buttons
    const handlePageChange = (page) => {
        let newUrl = `http://127.0.0.1:8000/inventory/all_items/?page=${page}`;
        if (page === 'next' && nextPage) {
            newUrl = nextPage;
            setCurrentPage(currentPage + 1);
        } else if (page === 'prev' && previousPage) {
            newUrl = previousPage;
            setCurrentPage(currentPage - 1);
        } else if (typeof page === 'number') {
            newUrl = `http://127.0.0.1:8000/inventory/all_items/?page=${page}`;
            setCurrentPage(page);
        }

        // Update the URL with the current page number
        navigate(`?page=${page}`, { replace: true });

        fetchData(newUrl);
    };

    const getPageNumbers = () => {
        const pageNumbers = [];
        let startPage = Math.max(currentPage - 2, 1);
        let endPage = Math.min(currentPage + 2, totalPages);

        // Add page numbers to the array
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }

        return pageNumbers;
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <section className="max-w-screen-2xl p-20 m-auto flex flex-col gap-10">
            <div className='font-semibold'>
                <h1 className='text-heading font-semibold text-3xl mb-10'>All Dresses</h1>
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

                {/* Page Numbers */}
                <div className="flex gap-2">
                    {/* Show the first page and ellipses if needed */}
                    {currentPage > 3 && (
                        <span
                            onClick={() => handlePageChange(1)}
                            className="cursor-pointer px-4 py-2 bg-gray-200 text-black rounded-md"
                        >
                            1
                        </span>
                    )}
                    {currentPage > 4 && <span className="px-4 py-2 text-gray-500">...</span>}
                    
                    {getPageNumbers().map((pageNumber) => (
                        <span
                            key={pageNumber}
                            onClick={() => handlePageChange(pageNumber)}
                            className={`cursor-pointer px-4 py-2 ${currentPage === pageNumber ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'} rounded-md`}
                        >
                            {pageNumber}
                        </span>
                    ))}

                    {currentPage < totalPages - 2 && <span className="px-4 py-2 text-gray-500">...</span>}
                    {currentPage < totalPages - 1 && (
                        <span
                            onClick={() => handlePageChange(totalPages)}
                            className="cursor-pointer px-4 py-2 bg-gray-200 text-black rounded-md"
                        >
                            {totalPages}
                        </span>
                    )}
                </div>

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
