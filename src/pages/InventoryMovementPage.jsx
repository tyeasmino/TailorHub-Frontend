import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { FaEdit } from 'react-icons/fa';
import { MdOutlineDeleteSweep } from 'react-icons/md';

const InventoryMovementPage = () => {
    const [inventoryMovements, setInventoryMovements] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [nextPage, setNextPage] = useState(null);
    const [previousPage, setPreviousPage] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [inventoryItems, setInventoryItems] = useState([]);  // <-- Add this line
    const [message, setMessage] = useState('');


    const token = localStorage.getItem('token');
    const [formData, setFormData] = useState({
        inventory_item: '',
        quantity: '',
        movement_type: 'Add',
        description: '',
    });


    useEffect(() => {
        fetch('http://127.0.0.1:8000/inventory/items/', {
            headers: {
                'Authorization': `Token ${token}`,  // Ensure the token is passed correctly
            }
        })
            .then((response) => response.json())
            .then((data) => setInventoryItems(data.results))  // Update state here
            .catch((error) => console.error('Error fetching inventory items:', error));
    }, []);


    const [editingMovement, setEditingMovement] = useState(null);

    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData({
    //         ...formData,
    //         [name]: value,
    //     });
    // };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };



    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     console.log('inventory movement data: ', formData);

    //     try {
    //         const method = editingMovement ? 'put' : 'post';  // Use PUT if editing, POST if adding
    //         const url = editingMovement
    //             ? `http://127.0.0.1:8000/inventory/items_movements/${editingMovement.id}/`
    //             : `http://127.0.0.1:8000/inventory/items_movements/`;

    //         const response = await axios({
    //             method,
    //             url,
    //             headers: {
    //                 'Authorization': `Token ${token}`,
    //             },
    //             data: formData,
    //         });



    //         if (response.status === 200 || response.status === 201) {
    //             fetchInventoryMovements(); // Re-fetch data after successful create/update
    //             setFormData({
    //                 inventory_item: '',
    //                 quantity: '',
    //                 movement_type: 'Add',
    //                 description: '',
    //             });
    //             setEditingMovement(null); // Reset editing state
    //             setShowForm(false); // Hide the form
    //         } else {
    //             setError('Failed to save movement');
    //         }
    //     } catch (err) {
    //         setError('Error saving movement');
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('inventory movement data: ', formData);

        try {
            const method = editingMovement ? 'put' : 'post';  // Use PUT if editing, POST if adding
            const url = editingMovement
                ? `http://127.0.0.1:8000/inventory/items_movements/${editingMovement.id}/`
                : `http://127.0.0.1:8000/inventory/items_movements/`;

            const response = await axios({
                method,
                url,
                headers: {
                    'Authorization': `Token ${token}`,
                },
                data: formData,
            });

            if (response.status === 200 || response.status === 201) {
                // If successful, set success message
                setMessage('Item movement added successfully!');
                fetchInventoryMovements(); // Re-fetch data after successful create/update
                setFormData({
                    inventory_item: '',
                    quantity: '',
                    movement_type: 'Add',
                    description: '',
                });
                setEditingMovement(null); // Reset editing state
                setShowForm(false); // Hide the form
            } else {
                // If API doesn't return a 200/201 status, set the failure message
                setMessage('Failed to add item movement.');
            }
        } catch (err) {
            // Handle specific error messages from backend (like insufficient balance)
            if (err.response && err.response.data && err.response.data.detail) {
                setMessage(err.response.data.detail); // Show the detailed error message
            } else {
                // Generic error message if no specific detail is found
                setMessage('Error saving movement.');
            }
        }
    };


    // Function to fetch inventory movement data
    const fetchInventoryMovements = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/inventory/items_movements/?page=${currentPage}`, {
                headers: {
                    'Authorization': `Token ${token}`,
                },
            });

            if (response.status === 200) {
                setInventoryMovements(response.data.results);
                setTotalPages(Math.ceil(response.data.count / 5));  // Assuming pageSize = 5
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

    // Handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Handle Delete Movement
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/inventory/items_movements/${id}/`, {
                headers: {
                    'Authorization': `Token ${token}`,
                },
            });
            fetchInventoryMovements(); // Re-fetch data after deletion
        } catch (err) {
            setError('Error deleting movement');
        }
    };

    // Fetch data when the component mounts or when currentPage changes
    useEffect(() => {
        fetchInventoryMovements();
    }, [currentPage]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <section className='flex'>
            <Sidebar />
            <section className="m-auto shadow my-20 p-10 max-w-screen-xl w-full">
                <h2 className="text-3xl font-bold mb-5">Inventory Movements</h2>

                {message && (
                    <div className={`p-4 mb-4 rounded-md ${message === 'Item movement added successfully!' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {message}
                    </div>
                )}


                {/* Button to show form */}
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="px-4 py-2 bg-violet-600 text-white rounded-md mb-4"
                >
                    {showForm ? 'Cancel' : 'Add New Movement'}
                </button>

                {/* New Movement Form */}
                {showForm && (
                    <form onSubmit={handleSubmit} className="space-y-4 mb-5 p-5 border rounded-lg shadow-lg">
                        <div>
                            <label htmlFor="inventory_item" className="block">Inventory Item</label>
                            <select
                                id="inventory_item"
                                name="inventory_item"
                                value={formData.inventory_item}  // Ensure this corresponds to the selected item ID in your form data
                                onChange={handleInputChange}
                                required
                                className="w-full p-2 border rounded"
                            >
                                <option value="">Select an item</option>  {/* Placeholder option */}
                                {/* Iterate over the inventory items */}
                                {inventoryItems.map(item => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="quantity" className="block">Quantity</label>
                            <input
                                type="number"
                                id="quantity"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleInputChange}
                                required
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <div>
                            <label htmlFor="movement_type" className="block">Movement Type</label>
                            <select
                                id="movement_type"
                                name="movement_type"
                                value={formData.movement_type}
                                onChange={handleInputChange}
                                required
                                className="w-full p-2 border rounded"
                            >
                                <option value="Add">Add</option>
                                <option value="Use">Use</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="description" className="block">Description</label>
                            <input
                                type="text"
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                required
                                className="w-full p-2 border rounded"
                            />
                        </div>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-violet-600 text-white rounded-md"
                        >
                            {editingMovement ? 'Update' : 'Add'} Movement
                        </button>
                    </form>
                )}

                {/* Table for displaying movements */}
                <table className="table-auto w-full mb-5">
                    <thead>
                        <tr className="border-b-2 border-violet-400">
                            <th className="py-3 text-start">Date</th>
                            <th className="py-3 text-start">Inventory Item</th>
                            <th className="py-3 text-start">Movement Type</th>
                            <th className="py-3 text-start">Quantity</th>
                            <th className="py-3 text-start">Description</th>
                            <th className="py-3 text-end">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inventoryMovements.map((movement) => (
                            <tr key={movement.id} className="border-b border-violet-200">
                                <td className="py-2 text-start">{movement.date}</td>
                                <td className="py-2 text-start">{movement.inventory_item_name}</td>
                                <td className="py-2 text-start">{movement.movement_type}</td>
                                <td className="py-2 text-start">{movement.quantity}</td>
                                <td className="py-2 text-start">{movement.description}</td>
                                <td className="py-2 text-end">
                                    <button
                                        onClick={() => {
                                            setFormData({
                                                inventory_item: movement.inventory_item_name,
                                                quantity: movement.quantity,
                                                movement_type: movement.movement_type,
                                                description: movement.description,
                                            });
                                            setEditingMovement(movement);
                                            setShowForm(true);
                                        }}
                                        className="bg-violet-600 text-white px-3 py-1 rounded mr-2"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(movement.id)}
                                        className="bg-red-600 text-white px-3 py-1 rounded"
                                    >
                                        <MdOutlineDeleteSweep />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Pagination Controls */}
                <div className="flex justify-between items-center">
                    <button
                        disabled={!previousPage}  // Disable if no previous page
                        onClick={() => handlePageChange(currentPage - 1)}
                        className={`px-4 py-2 ${!previousPage ? 'bg-gray-400' : 'bg-heading'} text-white rounded-md hover:bg-violet-700 focus:outline-none`}
                    >
                        Previous
                    </button>

                    <div className="flex">
                        {Array.from({ length: totalPages }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => handlePageChange(index + 1)}
                                className={`px-4 py-2 ${currentPage === index + 1 ? 'bg-violet-700' : 'bg-violet-600'} text-white rounded-md mx-1 hover:bg-violet-700 focus:outline-none`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>

                    <button
                        disabled={!nextPage}  // Disable if no next page
                        onClick={() => handlePageChange(currentPage + 1)}
                        className={`px-4 py-2 ${!nextPage ? 'bg-gray-400' : 'bg-heading'} text-white rounded-md hover:bg-violet-700 focus:outline-none`}
                    >
                        Next
                    </button>
                </div>

            </section>
        </section>
    );
};

export default InventoryMovementPage;
