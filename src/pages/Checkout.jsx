import React, { useState } from "react";
import { useCart } from "../contexts/cartContext";
import { Link } from "react-router-dom";

const Checkout = () => {
    const { cartList, clearFromCart } = useCart();

    // Filter only selected items for checkout
    const selectedItems = cartList.filter(item => item.selected);
 

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
                            <tr className="border-b" key={dress.id}>
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

 

            {/* Continue Shopping */}
            <div className="flex justify-center mt-6">
                <Link to="/dresses" className="text-violet-500 hover:text-violet-700 font-medium">
                    Continue Shopping
                </Link>
            </div>
            
            <Link to='http://127.0.0.1:8000/payments/'>
                <button type="submit" className="bg-violet-500 text-white px-8 py-3 rounded-md hover:bg-violet-600">
                    Complete Order
                </button>
            </Link>
        </section>
    );
};

export default Checkout;
