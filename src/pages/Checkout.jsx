import React, { useState } from "react";
import { useCart } from "../contexts/cartContext";
import { Link } from "react-router-dom";

const Checkout = () => {
    const { cartList, clearFromCart } = useCart();

    // Filter only selected items for checkout
    const selectedItems = cartList.filter(item => item.selected);

    // Form state for shipping info
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        city: "",
        postalCode: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here (e.g., call API, process payment)
        alert("Checkout Complete!");
        clearFromCart(); // Clear the cart after checkout
    };

    return (
        <section className="max-w-4xl mx-auto p-6 my-10">
            <h2 className="text-3xl font-semibold text-center mb-6">Checkout</h2>

            {/* Cart Items Summary */}
            <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-4">Your Cart</h3>
                <table className="table-auto w-full text-left border border-gray-200">
                    <thead>
                        <tr className="bg-violet-100">
                            <th className="px-4 py-2">Item</th>
                            <th className="px-4 py-2">Fabric Type</th>
                            <th className="px-4">Price</th>
                            <th className="px-4 py-2">Quantity</th>
                            <th className="px-4 py-2 text-right">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {selectedItems?.map((dress) => (
                            <tr className="border-b" key={dress .id}>
                                <td className="px-4 ">{dress?.name}</td>
                                <td className="px-4 ">{dress?.fabric_type}</td>
                                <td className="px-4 ">
                                    <td className="text-right">
                                        {(parseFloat(dress?.discount_price) || parseFloat(dress?.base_price)).toFixed(2)}
                                    </td>
                                </td>
                                <td className="px-4 ">{dress?.quantity}</td>
                                <td className="px-4 text-right ">
                                    {(
                                        dress?.quantity * (dress?.discount_price || dress?.base_price)
                                    ).toFixed(2)}
                                </td>
                            </tr>
                        ))}
                        <tr className="font-bold">
                            <td colSpan={4} className="px-20 py-2 text-right">
                                Total
                            </td>
                            <td className="px-4 py-2 text-right">
                            {selectedItems.reduce((acc, dress) => acc + (parseFloat(dress.discount_price || dress.base_price) * dress.quantity), 0).toFixed(2)}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Shipping Form */}
            <div className="mb-8">
                <h3 className="text-2xl font-semibold mb-4">Shipping Information</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <div className="w-1/2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                            Address
                        </label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                City
                            </label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                        <div className="w-1/2">
                            <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                                Postal Code
                            </label>
                            <input
                                type="text"
                                id="postalCode"
                                name="postalCode"
                                value={formData.postalCode}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-md"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        <button type="submit" className="bg-violet-500 text-white px-8 py-3 rounded-md hover:bg-violet-600">
                            Complete Order
                        </button>
                        <button
                            type="button"
                            onClick={() => clearFromCart()}
                            className="text-red-500 hover:text-red-700"
                        >
                            Clear Cart
                        </button>
                    </div>
                </form>
            </div>

            {/* Continue Shopping */}
            <div className="flex justify-center mt-6">
                <Link to="/dresses" className="text-violet-500 hover:text-violet-700 font-medium">
                    Continue Shopping
                </Link>
            </div>
        </section>
    );
};

export default Checkout;
