import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { FaEdit } from 'react-icons/fa';
import { MdOutlineDeleteSweep } from 'react-icons/md';
import { FormGroup, Label, Input } from 'reactstrap';
import { TbArrowBackUpDouble } from "react-icons/tb";
import { TbArrowForwardUpDouble } from "react-icons/tb";



const InventoryMovementPage = () => {
    const [inventoryMovements, setInventoryMovements] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [nextPage, setNextPage] = useState(null);
    const [previousPage, setPreviousPage] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [inventoryItems, setInventoryItems] = useState([]);
    const [message, setMessage] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    const token = localStorage.getItem('token');
    const [formData, setFormData] = useState({
        inventory_item: '',
        quantity: '',
        movement_type: 'Add',
        description: ''
    });

    const [editingMovement, setEditingMovement] = useState(null);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://tailor-hub-backend.vercel.app/inventory/items_movements/${id}/`, {
                headers: {
                    'Authorization': `Token ${token}`,
                },
            });

            // Check if the page we're on is empty after deletion
            if (inventoryMovements.length === 1 && currentPage > 1) {
                setCurrentPage(currentPage - 1);  // Move to the previous page
            } else {
                fetchInventoryMovements();  // Re-fetch data after deletion
            }

        } catch (err) {
            setError('Error deleting movement');
        }
    };



    const handleSubmit = async (event) => {
        event.preventDefault();

        // Log the formData object before making the request
        console.log('Form data being sent:', formData);

        const url = isEditing
            ? `https://tailor-hub-backend.vercel.app/inventory/items_movements/${editingMovement.id}/`  // Edit endpoint
            : 'https://tailor-hub-backend.vercel.app/inventory/items_movements/';  // Add endpoint

        try {
            const method = isEditing ? 'put' : 'post';

            // Log the API request details
            console.log('Making request to:', url, 'with method:', method);

            const response = await axios({
                method,
                url,
                headers: {
                    'Authorization': `Token ${token}`,
                },
                data: formData,
            });

            // Log the response from the API
            console.log('API response:', response);

            if (isEditing) {
                const updatedMovements = inventoryMovements.map(movement =>
                    movement.id === editingMovement.id ? response.data : movement
                );
                setInventoryMovements(updatedMovements);
            } else {
                setInventoryMovements([response.data, ...inventoryMovements]);
            }

            setMessage(isEditing ? 'Item movement updated successfully!' : 'Item movement added successfully!');
            setShowForm(false);
            setIsEditing(false);
            setFormData({ inventory_item: '', quantity: '', movement_type: 'Add', description: '' });
        } catch (err) {
            // Log the error response from the API
            if (err.response) {
                console.log('Error response from API:', err.response.data);
                setError(err.response.data.detail || 'Error submitting movement');
            } else {
                console.log('Error during request:', err.message);
                setError('Error submitting movement');
            }
        }
    };






    const fetchInventoryMovements = async () => {
        try {
            const response = await axios.get(`https://tailor-hub-backend.vercel.app/inventory/items_movements/?page=${currentPage}`, {
                headers: {
                    'Authorization': `Token ${token}`,
                },
            });

            if (response.status === 200) {
                const totalItems = response.data.count;  // This is the total count of movements
                const totalPages = Math.ceil(totalItems / 5);  // Assuming page size is 5

                // Set inventory movements and total pages
                setInventoryMovements(response.data.results);
                setTotalPages(totalPages);

                // Adjust currentPage if necessary
                if (currentPage > totalPages) {
                    setCurrentPage(totalPages);  // Go to the last valid page
                }

                setNextPage(response.data.next);
                setPreviousPage(response.data.previous);
                setIsLoading(false);
            } else {
                setError('Failed to fetch inventory movements');
                setIsLoading(false);
            }
        } catch (err) {
            setError('Error fetching inventory movements');
            setIsLoading(false);
        }
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const getPaginationNumbers = () => {
        const range = 2; // Number of pages before and after the current page
        let start = Math.max(currentPage - range, 1); // Ensure the start page is >= 1
        let end = Math.min(currentPage + range, totalPages); // Ensure the end page is <= total pages

        const paginationNumbers = [];

        if (start > 1) {
            paginationNumbers.push(1); // Show the first page
            if (start > 2) paginationNumbers.push('...'); // Show ellipsis before start if needed
        }

        for (let i = start; i <= end; i++) {
            paginationNumbers.push(i);
        }

        if (end < totalPages) {
            if (end < totalPages - 1) paginationNumbers.push('...'); // Show ellipsis after end if needed
            paginationNumbers.push(totalPages); // Show the last page
        }

        return paginationNumbers;
    };

    useEffect(() => {
        const fetchAllInventoryItems = async () => {
            let allItems = [];
            let nextPageUrl = 'https://tailor-hub-backend.vercel.app/inventory/items/';

            try {
                // Keep fetching until there are no more pages
                while (nextPageUrl) {
                    const response = await fetch(nextPageUrl, {
                        headers: {
                            'Authorization': `Token ${token}`,
                        },
                    });
                    const data = await response.json();
                    allItems = [...allItems, ...data.results]; // Accumulate all items
                    nextPageUrl = data.next; // Set the next page URL
                }

                // After all pages are fetched, update state with all items
                setInventoryItems(allItems);
            } catch (error) {
                console.error('Error fetching inventory items:', error);
            }
        };

        fetchAllInventoryItems(); // Fetch all inventory items
    }, [token]);

    useEffect(() => {
        fetchInventoryMovements();
    }, [currentPage]);

    // If you're editing an existing movement, set the initial state of formData
    useEffect(() => {
        if (editingMovement) {
            setFormData({
                inventory_item: editingMovement.inventory_item,
                quantity: editingMovement.quantity,
                movement_type: editingMovement.movement_type,
                description: editingMovement.description
            });
            setIsEditing(true);  // Set isEditing to true when in edit mode
        } else {
            setFormData({
                inventory_item: '',
                quantity: '',
                movement_type: 'Add',
                description: ''
            });
            setIsEditing(false); // Set isEditing to false when adding a new movement
        }
    }, [editingMovement]); // Don't change the structure of useEffect


    return (
        <section className='flex'>
            <Sidebar />
            <section className="ml-10 md:m-auto shadow md:my-20 pl-8 pr-3 py-10 md:p-10 md:max-w-screen-xl w-full">
                <h2 className="text-sm md:text-3xl font-bold mb-5">Inventory Movements</h2>

                {message && (
                    <div className={`p-4 mb-4 rounded-md ${message === 'Item movement added successfully!' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {message}
                    </div>
                )}

                {error && (
                    <div className="p-4 mb-4 rounded-md bg-red-100 text-red-800">
                        {error}
                    </div>
                )}


                <button
                    onClick={() => setShowForm(!showForm)}
                    className="px-4 py-2  bg-violet-600 text-white text-[12px] md:text-[16px] rounded-md mb-4"
                >
                    {showForm ? 'Cancel' : 'Add New Movement'}
                </button>

                {showForm && (
                    <form onSubmit={handleSubmit} className="space-y-4 mb-5 p-5 border rounded-lg shadow-lg">
                        <div className='flex flex-col md:flex-row'>
                            <div className='md:w-1/2 md:px-5'>
                                {/* Inventory Item */}
                                <FormGroup className='py-2'>
                                    <Label for="inventory_item">Inventory Item</Label>
                                    <Input className='w-full p-2 border rounded text-sm md:text-[14px]'
                                        type="select"
                                        id="inventory_item"
                                        disabled={isEditing}
                                        value={formData.inventory_item}
                                        onChange={(e) => setFormData({ ...formData, inventory_item: e.target.value })}
                                    >
                                        <option  >Select an item</option>
                                        {inventoryItems.map(item => (
                                            <option key={item.id} value={item.id}>{item.name}</option>
                                        ))}
                                    </Input>
                                </FormGroup>

                                {/* Quantity */}
                                <FormGroup className='py-2'>
                                    <Label for="quantity">Quantity</Label>
                                    <Input className='w-full p-2 border rounded'
                                        type="number"
                                        id="quantity"
                                        disabled={isEditing}
                                        value={formData.quantity}
                                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                                    />
                                </FormGroup>

                                {/* Movement Type */}
                                <FormGroup className='py-2'>
                                    <Label for="movement_type">Movement Type</Label>
                                    <Input className='w-full p-2 border rounded'
                                        type="select"
                                        id="movement_type"
                                        disabled={isEditing}
                                        value={formData.movement_type}
                                        onChange={(e) => setFormData({ ...formData, movement_type: e.target.value })}
                                    >
                                        <option value="Add">Add</option>
                                        <option value="Use">Use</option>
                                    </Input>
                                </FormGroup>
                            </div>

                            <div className="md:w-1/2">
                                {/* Description */}
                                <FormGroup className='py-2'>
                                    <Label for="description">Description</Label>
                                    <textarea className='w-full p-2 border rounded'
                                        rows={5}
                                        id="description"
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        required
                                    />
                                </FormGroup>


                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="px-4 py-2 mt-2 text-sm md:text-lg bg-violet-600 text-white rounded-md"
                                >
                                    {isEditing ? 'Update' : 'Add'} Movement
                                </button>
                            </div>
                        </div>
                    </form>
                )}

                {/* Table */}
                <table className="table-auto w-full mb-5">
                    <thead>
                        <tr className="border-b-2 border-violet-400">
                            <th className="text-[12px] md:text-[16px] py-3 text-start">Date</th>
                            <th className="text-[12px] md:text-[16px] py-3 text-start"><span className='hidden md:inline-block'>Inventory</span> Item</th>
                            <th className="text-[12px] md:text-[16px] py-3 text-start"> <span className='hidden md:inline-block'>Movement</span> Type </th>
                            <th className="text-[12px] md:text-[16px] py-3 text-start">
                                <span className="block md:hidden">Qty</span>
                                <span className="hidden md:block">Quantity</span>
                            </th>

                            <th className="text-[12px] md:text-[16px] py-3 text-start hidden md:table-cell">Description</th>
                            <th className="text-[12px] md:text-[16px] py-3 text-end">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {inventoryMovements.map(movement => {
                            // Find the item name from the inventoryItems array based on the id
                            const inventoryItem = inventoryItems.find(item => item.id === movement.inventory_item);
                            return (
                                <tr key={movement.id} className="border-b border-violet-200">
                                    <td className="text-[10px] md:text-[14px] py-2 text-start">{movement.date}</td>
                                    {/* Display the item name here */}
                                    <td className="text-[10px] md:text-[14px] py-2 text-start">
                                        {inventoryItem ?
                                            (window.innerWidth <= 768 ?
                                                `${inventoryItem.name.slice(0, 13)}...` :
                                                inventoryItem.name)
                                            : 'Item Not Found'}
                                    </td>

                                    <td className="text-[10px] md:text-[14px] py-2 text-start">{movement.movement_type}</td>
                                    <td className="text-[10px] md:text-[14px] py-2 text-start">{movement.quantity}</td>
                                    <td className="py-2 text-start hidden md:table-cell">{movement.description}</td>
                                    <td className="text-[10px] md:text-[14px] flex py-2 items-center justify-center md:justify-end ">
                                        <button
                                            onClick={() => {
                                                setEditingMovement(movement);
                                                setShowForm(true);
                                            }}
                                            className="text-violet-600 text-[12px] md:bg-violet-600 md:text-white md:px-3 md:py-1 rounded mr-2"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(movement.id)}
                                            className="text-red-600 text-[14px] md:bg-red-600 md:text-white md:px-3 md:py-1 rounded"
                                        >
                                            <MdOutlineDeleteSweep />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>

                </table>

                {/* Pagination Controls */}
                <div className="flex text-[12px] md:text-[16px]  justify-between items-center">
                    <button
                        disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}
                        className={`px-4 py-2 ${currentPage === 1 ? 'bg-gray-400' : 'bg-violet-600'} text-white rounded-md hover:bg-violet-700 focus:outline-none`}
                    >
                        <TbArrowBackUpDouble />
                    </button>

                    <div className="flex ">
                        {getPaginationNumbers().map((pageNumber, index) => (
                            <button key={index} onClick={() => handlePageChange(pageNumber)}
                                className={`px-4 py-2 ${currentPage === pageNumber ? 'bg-pink' : 'bg-violet-600'} text-white rounded-md mx-1 hover:bg-violet-700 focus:outline-none`}
                            >
                                {pageNumber}
                            </button>
                        ))}
                    </div>

                    <button
                        disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}
                        className={`px-4 py-2 ${currentPage === totalPages ? 'bg-gray-400' : 'bg-violet-600'} text-white rounded-md hover:bg-violet-700 focus:outline-none`}
                    >
                        <TbArrowForwardUpDouble />
                    </button>
                </div>
            </section>
        </section>
    );
};

export default InventoryMovementPage;
