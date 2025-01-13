import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios'; // For making API requests
import { MdFormatListBulletedAdd } from 'react-icons/md'; // The icon for adding items
import { AuthContext } from '../contexts/AuthContext';
import Modal from '../components/Modal'; // Modal component for the form
import Sidebar from '../components/Sidebar';

const InventoryPage = () => {
  const { user } = useContext(AuthContext); // Get user from context
  const token = localStorage.getItem('token'); // Get token from local storage (for API authentication)

  const [inventoryItems, setInventoryItems] = useState([]); // To store the fetched inventory items
  const [isLoading, setIsLoading] = useState(true); // To track loading state
  const [error, setError] = useState(null); // To store errors (if any)
  const [showModal, setShowModal] = useState(false); // To control the modal visibility
  const [newItem, setNewItem] = useState({
    item_type: '',
    name: '',
    purchase_price_per_unit: '',
    sell_price_per_unit: '',
    stock: '',
    color: '',
    supplier: '',
    description: '',
    category: '',
  }); // To store the new item data for the form

  // Fetch the inventory items when the component mounts
  useEffect(() => {
    const fetchInventoryItems = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/inventory/items/', {
          headers: {
            'Authorization': `Token ${token}`,
          },
        });
        if (response.status === 200) {
          setInventoryItems(response.data);
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
  }, [token]);

  // Handle input changes for the new item form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission to add a new item to the inventory
  const handleAddItem = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8000/inventory/items/', newItem, {
        headers: {
          'Authorization': `Token ${token}`,
        },
      });

      if (response.status === 201) {
        setInventoryItems([...inventoryItems, response.data]); // Add new item to the list
        setShowModal(false); // Close the modal
        setNewItem({
          item_type: '',
          name: '',
          purchase_price_per_unit: '',
          sell_price_per_unit: '',
          stock: '',
          color: '',
          supplier: '',
          description: '',
          category: '',
        }); // Reset the form
      } else {
        setError('Failed to add new item');
      }
    } catch (err) {
      setError('Error adding new item');
    }
  };

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
    <section className="flex flex-col m-auto shadow my-20 p-10 max-w-screen-lg w-full">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-3xl font-bold">Inventory Items</h2>
        <MdFormatListBulletedAdd
          className="text-3xl cursor-pointer"
          onClick={() => setShowModal(true)} // Show the modal on click
        />
      </div>

      {/* Table to display inventory items */}
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Item Type</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Purchase Price</th>
            <th className="border px-4 py-2">Sell Price</th>
            <th className="border px-4 py-2">Stock</th>
            <th className="border px-4 py-2">Color</th>
            <th className="border px-4 py-2">Supplier</th>
          </tr>
        </thead>
        <tbody>
          {inventoryItems.map((item) => (
            <tr key={item.id}>
              <td className="border px-4 py-2">{item.id}</td>
              <td className="border px-4 py-2">{item.item_type}</td>
              <td className="border px-4 py-2">{item.name}</td>
              <td className="border px-4 py-2">{item.purchase_price_per_unit}</td>
              <td className="border px-4 py-2">{item.sell_price_per_unit}</td>
              <td className="border px-4 py-2">{item.stock}</td>
              <td className="border px-4 py-2">{item.color}</td>
              <td className="border px-4 py-2">{item.supplier}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal to Add New Item */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h2 className="text-2xl font-bold mb-5">Add New Inventory Item</h2>
          <form onSubmit={handleAddItem} className="flex flex-col gap-5">
            <div className="flex gap-5">
              <div className="w-1/2">
                <label htmlFor="item_type" className="font-semibold">Item Type</label>
                <input
                  type="text"
                  name="item_type"
                  value={newItem.item_type}
                  onChange={handleChange}
                  className="input w-full"
                />
              </div>

              <div className="w-1/2">
                <label htmlFor="name" className="font-semibold">Name</label>
                <input
                  type="text"
                  name="name"
                  value={newItem.name}
                  onChange={handleChange}
                  className="input w-full"
                />
              </div>
            </div>

            <div className="flex gap-5">
              <div className="w-1/2">
                <label htmlFor="purchase_price_per_unit" className="font-semibold">Purchase Price</label>
                <input
                  type="number"
                  name="purchase_price_per_unit"
                  value={newItem.purchase_price_per_unit}
                  onChange={handleChange}
                  className="input w-full"
                />
              </div>

              <div className="w-1/2">
                <label htmlFor="sell_price_per_unit" className="font-semibold">Sell Price</label>
                <input
                  type="number"
                  name="sell_price_per_unit"
                  value={newItem.sell_price_per_unit}
                  onChange={handleChange}
                  className="input w-full"
                />
              </div>
            </div>

            <div className="flex gap-5">
              <div className="w-1/2">
                <label htmlFor="stock" className="font-semibold">Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={newItem.stock}
                  onChange={handleChange}
                  className="input w-full"
                />
              </div>

              <div className="w-1/2">
                <label htmlFor="color" className="font-semibold">Color</label>
                <input
                  type="text"
                  name="color"
                  value={newItem.color}
                  onChange={handleChange}
                  className="input w-full"
                />
              </div>
            </div>

            <div className="flex gap-5">
              <div className="w-1/2">
                <label htmlFor="supplier" className="font-semibold">Supplier</label>
                <input
                  type="text"
                  name="supplier"
                  value={newItem.supplier}
                  onChange={handleChange}
                  className="input w-full"
                />
              </div>

              <div className="w-1/2">
                <label htmlFor="description" className="font-semibold">Description</label>
                <input
                  type="text"
                  name="description"
                  value={newItem.description}
                  onChange={handleChange}
                  className="input w-full"
                />
              </div>
            </div>

            <button type="submit" className="bg-heading text-white px-5 py-2 rounded mt-5">Add Item</button>
          </form>
        </Modal>
      )}
    </section>
    </section>
  );
};

export default InventoryPage;
