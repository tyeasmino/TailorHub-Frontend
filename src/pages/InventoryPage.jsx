import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios'; // For making API requests
import { MdFormatListBulletedAdd } from 'react-icons/md'; // The icon for adding items
import { AuthContext } from '../contexts/AuthContext';
import Modal from '../components/Modal'; // Modal component for the form
import Sidebar from '../components/Sidebar';
import { FaEdit } from "react-icons/fa";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { uploadImage } from '../apiServices/apiService';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import { TbArrowBackUpDouble } from "react-icons/tb";
import { TbArrowForwardUpDouble } from "react-icons/tb";



const InventoryPage = () => {
  const { user } = useContext(AuthContext); // Get user from context
  const token = localStorage.getItem('token'); // Get token from local storage (for API authentication)

  const [inventoryItems, setInventoryItems] = useState([]); // To store the fetched inventory items
  const [isLoading, setIsLoading] = useState(true); // To track loading state
  const [error, setError] = useState(null); // To store errors (if any)
  const [showModal, setShowModal] = useState(false); // To control the modal visibility
  const [editingItem, setEditingItem] = useState(null); // This will hold the item to be edited

  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [totalPages, setTotalPages] = useState(0); // Track the total number of pages
  const [pageSize, setPageSize] = useState(5);



  const [newItem, setNewItem] = useState({
    item_type: 'Tool',
    name: '',
    description: '',
    fabric_type: '',
    color: '',
    image: null,
    purchase_price: '',
    base_price: 0,
    discount_price: 0,
    stock: 0,
    supplier: '',
    order_count: 0,
    category: '',
    fitmaker: '',
    is_upcoming: false,
    is_upcoming: false,
  });

  const [sortField, setSortField] = useState(null); // Field by which to sort (e.g. 'item_type', 'stock', etc.)
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'


  useEffect(() => {
    if (editingItem) {
      setNewItem({
        ...editingItem, // This should be the item you fetched from the server
        is_upcoming: editingItem.is_upcoming === "true" || editingItem.is_upcoming === true,
        is_featured: editingItem.is_featured === "true" || editingItem.is_featured === true,
      });
    }
  }, [editingItem]);
  
  // Fetch the inventory items when the component mounts
  useEffect(() => {
    const fetchInventoryItems = async () => {
      try {
        const response = await axios.get(`https://tailor-hub-backend.vercel.app/inventory/items/?page=${currentPage}&page_size=${pageSize}`, {
          headers: {
            'Authorization': `Token ${token}`,
          },
        });

        if (response.status === 200) {
          setInventoryItems(response.data.results);
          setTotalPages(Math.ceil(response.data.count / pageSize)); // Update total pages
          setIsLoading(false);
        } else {
          setError('Failed to fetch inventory items');
          setIsLoading(false);
        }
      } catch (err) {
        setError('Failed to fetch inventory items');
        setIsLoading(false);
      }
    };

    fetchInventoryItems();
  }, [currentPage, pageSize, token]);



  const handlePageChange = (page) => {
    setCurrentPage(page); // Update the current page
  };


  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;

    // Handle file input (for images) separately
    if (type === 'checkbox') {
      setNewItem({ ...newItem, [name]: checked });
    } else if (type === 'file') {
      setNewItem({ ...newItem, [name]: files[0] });
    } else {
      setNewItem({ ...newItem, [name]: value });
    }
  };

  const handleEditItem = (item) => {
    setEditingItem(item);  // Set the item being edited
    setNewItem({ ...item }); // Populate the form fields with the item data
    setShowModal(true); // Open the modal for editing
  };

  const handleAddItem = async (e) => {
    e.preventDefault();

    // Upload image first if there's an image selected
    let imageUrl = '';
    if (newItem.image) {
      imageUrl = await uploadImage(newItem.image); // Upload image
    }

    // Add the image URL to the newItem object
    const itemData = {
      ...newItem,
      fitmaker: user.fitMaker,
      image: imageUrl,
      is_upcoming: newItem.is_upcoming === true,  
      is_featured: newItem.is_featured === true,
    };

    console.log(itemData);

    try {
      const response = await axios.post('https://tailor-hub-backend.vercel.app/inventory/items/', itemData, {
        headers: {
          'Authorization': `Token ${token}`,
        },
      });

      if (response.status === 201) {
        setInventoryItems([...inventoryItems, response.data]);
        setShowModal(false);
        resetForm(); // Reset the form after adding a new item
      } else {
        setError('Failed to add new item');
      }
    } catch (err) {
      console.error(err); // Log error for more detailed debugging
      setError('Error adding new item');
    }
  };


  const handleUpdateItem = async (e) => {
    e.preventDefault();

    // If the image is updated, upload the new image and set the image URL
    let imageUrl = '';
    if (newItem.image && newItem.image instanceof File) {
      imageUrl = await uploadImage(newItem.image); // Upload image
    }

    const updatedItemData = {
      ...newItem,
      image: imageUrl || newItem.image,  // If no new image, keep the old image
    };

    try {
      const response = await axios.put(`https://tailor-hub-backend.vercel.app/inventory/items/${editingItem.id}/`, updatedItemData, {
        headers: {
          'Authorization': `Token ${token}`,
        },
      });

      if (response.status === 200) {
        // Update the inventoryItems list with the updated item
        setInventoryItems(inventoryItems.map(item => item.id === editingItem.id ? response.data : item));
        setShowModal(false); // Close the modal
        resetForm(); // Reset the form after update
        setEditingItem(null); // Clear editing item state
      } else {
        setError('Failed to update item');
      }
    } catch (err) {
      console.error('Error updating item:', err);
      setError('An error occurred while updating the item.');
    }
  };

  const resetForm = () => {
    setNewItem({
      item_type: 'Tool',
      name: '',
      description: '',
      fabric_type: '',
      color: '',
      image: null,
      purchase_price: '',
      base_price: 0,
      discount_price: 0,
      stock: 0,
      supplier: '',
      order_count: 0,
      category: '',
      fitmaker: '',
      is_upcoming: false,
      is_upcoming: false,
    });
  };




  const handleDeleteItem = async (itemId) => {
    const confirmed = window.confirm("Are you sure you want to delete this item?");
    if (!confirmed) return;

    try {
      // Make the DELETE request to the API
      const response = await axios.delete(`https://tailor-hub-backend.vercel.app/inventory/items/${itemId}/`, {
        headers: {
          'Authorization': `Token ${token}`,
        },
      });

      if (response.status === 204) {
        // Successfully deleted the item, update the state to remove it from the list
        setInventoryItems(inventoryItems.filter(item => item.id !== itemId));
      } else {
        alert("Failed to delete item");
      }
    } catch (err) {
      console.error("Error deleting item:", err);
      alert("An error occurred while deleting the item.");
    }
  };


  // Sorting function
  const handleSort = (field) => {
    const isSameField = sortField === field;
    const newSortOrder = isSameField && sortOrder === 'asc' ? 'desc' : 'asc'; // Toggle sort order
    setSortField(field);
    setSortOrder(newSortOrder);
  };

  // Sort items based on the selected field and order
  const sortedItems = [...inventoryItems].sort((a, b) => {
    if (sortField) {
      if (typeof a[sortField] === 'string') {
        return sortOrder === 'asc'
          ? a[sortField].localeCompare(b[sortField])
          : b[sortField].localeCompare(a[sortField]);
      } else if (typeof a[sortField] === 'number') {
        return sortOrder === 'asc' ? a[sortField] - b[sortField] : b[sortField] - a[sortField];
      }
    }
    return 0;
  });






  // If data is loading, show a loading spinner
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // If there is an error while fetching data, show an error message
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className='flex'>
      <Sidebar />

      {/* <section className='mx-64 p-10 max-w-screen-2xl w-full'>
        </section> */}
      <section className="flex flex-col ml-10 md:m-auto shadow md:my-20 p-10 md:max-w-screen-xl w-full">
        <div className="flex justify-between items-center mb-5">
          <h2 className="md:text-3xl font-bold">Inventory Items</h2>
          <MdFormatListBulletedAdd
            className="md:text-3xl cursor-pointer"
            onClick={() => setShowModal(true)} // Show the modal on click
          />
        </div>

        {/* Table to display inventory items */}
        <table className="table-auto w-full">
          <thead>
            <tr className="text-[12px] md:text-[16px] border-b-2 border-violet-400">
              <th
                className="py-3 flex text-start cursor-pointer"
                onClick={() => handleSort('item_type')}
              >
                Item Type {sortField === 'item_type' && (sortOrder === 'asc' ? <MdArrowDropUp /> : <MdArrowDropDown />)}

              </th>
              <th className="py-3 text-start">Name</th>
              <th
                className="hidden md:table-cell py-3 text-start cursor-pointer"
                onClick={() => handleSort('purchase_price')}
              >
                Purchase Price
              </th>
              <th
                className="hidden md:table-cell py-3 text-start cursor-pointer"
                onClick={() => handleSort('base_price')}
              >
                Sell Price
              </th>
              <th className="py-3 text-start cursor-pointer" onClick={() => handleSort('stock')}> Stock </th>
              <th className="hidden md:table-cell py-3 text-start">Color</th>
              <th className="hidden md:table-cell py-3 text-start cursor-pointer" onClick={() => handleSort('supplier')}> Supplier </th>
              <th className="py-3 text-start" colSpan={2}>Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedItems.map((item) => (
              <tr key={item.id} className="border-b border-violet-200">
                <td className="text-[12px] md:text-[16px] py-2 text-start">{item.item_type}</td>
                <td className="py-2 text-start">
                {/* Show image only on mobile */}
                <img src={item.image} className="w-[30px] h-[30px] object-cover overflow-hidden rounded-md block md:hidden" alt="" />

                {/* Show both image and name on desktop */}
                <div className="hidden md:flex items-center gap-3">
                  <img src={item.image} className="w-[50px] h-[50px] object-cover overflow-hidden rounded-md" alt="" />
                  {item.name}
                </div>
              </td>

                <td className="hidden md:table-cell py-2 text-start">{item.purchase_price}</td>
                <td className="hidden md:table-cell py-2 text-start">{item.discount_price !== '0.00' ? item.discount_price : item.base_price}</td>
                <td className="text-[12px] md:text-[16px] py-2 text-center">{item.stock}</td>
                <td className="hidden md:table-cell py-2 text-start">{item.color}</td>
                <td className="hidden md:table-cell py-2 text-start">{item.supplier}</td>
                <td className="py-2 text-start">
                  <FaEdit className="text-heading " onClick={() => handleEditItem(item)} />
                </td>
                <td className="py-2 text-start">
                  <MdOutlineDeleteSweep className="text-pink" onClick={() => handleDeleteItem(item.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className='flex flex-col md:flex-row gap-3 items-center py-3 justify-between'>

          {/* Page Size Dropdown */}
          <div className="text-[12px] md:text-[16px]  flex justify-center items-center">
            <label htmlFor="pageSize" className="mr-2">Items per page:</label>
            <select
              id="pageSize"
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="px-4 py-2 border rounded-md"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>

          {/* Pagination Controls */}
          <div className="text-[12px] md:text-[16px]  flex justify-center">
            {/* Previous Button */}
            <button
              disabled={currentPage === 1}  // Disable if on the first page
              onClick={() => handlePageChange(currentPage - 1)}
              className={`px-4 py-2 bg-heading text-white rounded-md hover:bg-violet-700 focus:outline-none ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''}`}
            >
              <TbArrowBackUpDouble />
            </button>

            {/* Page number buttons */}
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 ${currentPage === index + 1 ? 'bg-violet-700' : 'bg-violet-600'} text-white rounded-md mx-1 hover:bg-violet-700 focus:outline-none`}
              >
                {index + 1}
              </button>
            ))}

            {/* Next Button */}
            <button
              disabled={currentPage === totalPages}  // Disable if on the last page
              onClick={() => handlePageChange(currentPage + 1)}
              className={`px-4 py-2 bg-heading text-white rounded-md hover:bg-violet-700 focus:outline-none ${currentPage === totalPages ? 'cursor-not-allowed opacity-50' : ''}`}
            >
              <TbArrowForwardUpDouble />
            </button>
          </div>
        </div>


        {/* Modal to Add New Item */}
        {showModal && (
          <div className="fixed inset-0 bg-opacity-50 z-50 flex justify-center items-center">
            <Modal onClose={() => setShowModal(false)}>
              <div className="w-full md:max-w-3xl md:m-auto my-6 bg-white rounded-lg shadow-xl p-6 relative">

                {/* Cross Button */}
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-4 right-4 text-xl font-bold text-gray-700"
                >
                  &times;
                </button>

                <h2 className="md:text-3xl font-semibold text-center mb-6 text-gray-800">Add New Inventory Item</h2>
                <form onSubmit={editingItem ? handleUpdateItem : handleAddItem} className="flex flex-col gap-6">
                  <div className="flex flex-col md:flex-row gap-2 md:gap-6">
                    <div className="md:w-1/2">
                      <label htmlFor="item_type" className="block text-sm md:text-lg font-semibold text-gray-700 mb-2">Item Type</label>
                      <select
                        name="item_type"
                        value={newItem.item_type}
                        onChange={handleChange}
                        className="input text-sm md:text-lg w-full px-4 py-3 border rounded-md bg-violet-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500 transition ease-in-out" >
                        <option value="Tool">Tool</option>
                        <option value="Fabric">Fabric</option>
                        <option value="Dress">Dress</option>
                      </select>
                    </div>
                    <div className="md:w-1/2">
                      <label htmlFor="name" className="block text-sm md:text-lg font-semibold text-gray-700 mb-2">Name</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={newItem.name}
                        onChange={handleChange}
                        className="input text-sm md:text-lg w-full px-4 py-3 border rounded-md bg-violet-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500 transition ease-in-out"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-2 md:gap-6">
                    <div className="md:w-1/4">
                      <label htmlFor="purchase_price" className="block  text-sm md:text-lg  font-semibold text-gray-700 mb-2">Purchase Price</label>
                      <input required
                        type="number"
                        name="purchase_price"
                        value={newItem.purchase_price}
                        onChange={handleChange}
                        className="input text-sm md:text-lg w-full px-4 py-3 border rounded-md bg-violet-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500 transition ease-in-out"
                      />
                    </div>

                    <div className="md:w-1/4">
                      <label htmlFor="base_price" className="block text-sm md:text-lg font-semibold text-gray-700 mb-2">Sell Price</label>
                      <input
                        type="number"
                        name="base_price"
                        value={newItem.base_price}
                        onChange={handleChange}
                        className="input text-sm md:text-lg w-full px-4 py-3 border rounded-md bg-violet-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500 transition ease-in-out"
                      />
                    </div>
                    <div className="md:w-1/4">
                      <label htmlFor="discount_price" className="block text-sm md:text-lg font-semibold text-gray-700 mb-2">Discount Price</label>
                      <input
                        type="number"
                        name="discount_price"
                        value={newItem.discount_price}
                        onChange={handleChange}
                        className="input text-sm md:text-lg w-full px-4 py-3 border rounded-md bg-violet-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500 transition ease-in-out"
                      />
                    </div>

                    <div className="md:w-1/4">
                      <label htmlFor="color" className="block text-sm md:text-lg font-semibold text-gray-700 mb-2">Color</label>
                      <input
                        type="text"
                        name="color"
                        value={newItem.color}
                        onChange={handleChange}
                        className="input text-sm md:text-lg w-full px-4 py-3 border rounded-md bg-violet-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500 transition ease-in-out"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-2 md:gap-6">
                    <div className="md:w-1/2">
                      <label htmlFor="category" className="block text-sm md:text-lg font-semibold text-gray-700 mb-2">Category</label>
                      <input
                        type="text"
                        name="category"
                        value={newItem.category}
                        onChange={handleChange}
                        className="input text-sm md:text-lg w-full px-4 py-3 border rounded-md bg-violet-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500 transition ease-in-out"
                      />
                    </div>
                    <div className="md:w-1/2">
                      <label htmlFor="supplier" className="block text-sm md:text-lg font-semibold text-gray-700 mb-2">Supplier</label>
                      <input
                        type="text"
                        name="supplier"
                        value={newItem.supplier}
                        onChange={handleChange}
                        className="input text-sm md:text-lg w-full px-4 py-3 border rounded-md bg-violet-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500 transition ease-in-out"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-2 md:gap-6">
                    <div className="md:w-1/2">

                      <div>
                        <label htmlFor="description" className="block text-sm md:text-lg font-semibold text-gray-700 mb-2">Description</label>
                        <textarea
                          rows={12}
                          name="description"
                          value={newItem.description}
                          onChange={handleChange}
                          className="input text-sm md:text-lg min-h-20 w-full px-4 py-3 border rounded-md bg-violet-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500 transition ease-in-out overflow-hidden"
                        />
                      </div>
                      <div className='flex flex-col md:flex-row gap-2 md:gap-10 md:items-center'>
                        <div>
                          <input type='checkbox' name="is_upcoming"
                            checked={newItem.is_upcoming}
                            value={newItem.is_upcoming}
                            onChange={handleChange} />
                          <label htmlFor="is_best_seller" className="text-sm md:text-lg ml-2  font-semibold text-gray-700 mb-2">Upcoming Dress</label>
                        </div>
                        <div>
                          <input type='checkbox' name="is_featured"
                            checked={newItem.is_featured}
                            value={newItem.is_featured}
                            onChange={handleChange} />
                          <label htmlFor="is_featured" className="text-sm md:text-lg ml-2   font-semibold text-gray-700 mb-2">Featured Dress</label>
                        </div>
                      </div>

                    </div>
                    <div className="md:w-1/2">
                      <label htmlFor="image" className="block text-sm md:text-lg font-semibold text-gray-700 mb-2">Image</label>
                      <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
                        className="file-input text-sm md:text-lg mt-2 file-input-bordered w-full bg-violet-50"
                      />

                      {newItem.image && newItem.image instanceof File && (
                        <p className="text-xs text-pink mt-1">New Image Uploaded</p>
                      )}
                      {newItem.image && !(newItem.image instanceof File) && (
                        <img src={newItem.image} alt="Attachment Preview" className="max-w-[100px] max-h-[100px] mt-2 rounded-xl" />
                      )}
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="bg-violet-600 text-sm md:text-lg text-white py-3 rounded-md hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500 transition duration-200 w-full mt-5"
                  >
                    {editingItem ? "Update Item" : "Add Item"} {/* Show correct text based on editing mode */}
                  </button>
                </form>
              </div>
            </Modal>
          </div>
        )}
      </section>
    </section>
  );
};

export default InventoryPage;
