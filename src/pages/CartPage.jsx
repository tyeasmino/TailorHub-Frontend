import React, { useEffect, useState } from 'react'
import { useCart } from '../contexts/cartContext'
import { Link } from 'react-router'
import { MdRemoveShoppingCart } from "react-icons/md";

const CartPage = () => {

    const { cartList, removeFromCart, total, clearFromCart, incrementQuantity, decrementQuantity, toggleSelectDress, selectAllDresses, deselectAllDresses } = useCart();

    // Calculate the total for selected items
    const selectedTotal = cartList.filter(item => item.selected).reduce((acc, dress) => {
        return acc + (parseFloat(dress.discount_price) || parseFloat(dress.base_price)) * dress.quantity;
    }, 0);



    return (
        <section className='flex '>

            {/* <section className='mx-64 p-10 max-w-screen-2xl w-full'>
        </section> */}
            <section className="flex rounded-3xl flex-col m-auto shadow-lg my-20 p-10 max-w-screen-lg w-full">
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-3xl font-bold">Your Cart</h2>
                </div>

                {/* Select All Checkbox */}
                <div className="mb-5">
                    <button onClick={selectAllDresses} className="mr-2 bg-violet-500 text-white px-4 py-2 rounded-md">Select All</button>
                    <button onClick={deselectAllDresses} className="bg-pink text-white px-4 py-2 rounded-md">Deselect All</button>
                </div>

                {/* Table to display inventory items */}
                <table className="table-auto w-full text-left">
                    <thead>
                        <tr className='border-b'>
                            <th className=" px-4 py-2">Select</th>
                            <th className=" px-4 py-2">Item</th>
                            <th className=" px-4 py-2">Fabric Type</th>
                            <th className=" px-4 py-2">Color</th>
                            <th className=" px-12 py-2 ">Qnt</th>
                            <th className="text-right px-4 py-2">Price</th>
                            <th className="text-right px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cartList?.map((dress) => (
                                <tr key={dress.id} className='border-b'>
                                    <td className="px-4 py-2">
                                        <input
                                            type="checkbox"
                                            checked={dress.selected}
                                            onChange={() => toggleSelectDress(dress.id)}
                                        />
                                    </td>
                                    <td className="flex items-center gap-5 px-4 py-2">
                                        <img className='w-10 rounded-full h-10' src={dress?.image} alt="" />
                                        <h3 className=''> {dress?.name} </h3>
                                    </td>
                                    <td className=" px-4 py-2">{dress?.fabric_type}</td>
                                    <td className=" px-4 py-2">{dress?.color}</td>
                                    <td className=" px-4 py-2 ">
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center gap-3">
                                                <div className="flex items-center gap-3">
                                                    {/* Decrement Button */}
                                                    <button
                                                        onClick={() => decrementQuantity(dress.id)}
                                                        className={`w-8 h-8 font-bold rounded-full flex items-center justify-center transition duration-200 
                                                        ${dress?.quantity <= 1 ? 'bg-pink text-white cursor-not-allowed' : 'bg-violet-500 text-white hover:bg-violet-600'}`}
                                                        disabled={dress?.quantity <= 1} // Disable if quantity is 1
                                                    >
                                                        -
                                                    </button>

                                                    {/* Quantity Display */}
                                                    <span className="text-xl font-semibold">{dress?.quantity}</span>

                                                    {/* Increment Button */}
                                                    <button
                                                        onClick={() => incrementQuantity(dress.id, dress?.stock)}
                                                        className={`w-8 h-8 font-bold rounded-full flex items-center justify-center transition duration-200 
                                                        ${dress?.quantity >= dress?.stock ? 'bg-pink text-white cursor-not-allowed' : 'bg-violet-500 text-white hover:bg-violet-600'}`}
                                                        disabled={dress?.quantity >= dress?.stock} // Disable if quantity reaches stock quantity
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-right px-4 py-2">{(dress?.quantity * (dress?.discount_price || dress?.base_price)).toFixed(2)}</td>
                                    <td className="text-right px-4 py-2">
                                        <button onClick={() => removeFromCart(dress)} className="text-red-500"> <MdRemoveShoppingCart /> </button>
                                    </td>
                                </tr>
                            ))
                        }

                        <tr className='mt-5 font-bold text-heading'>
                            <td colSpan={4} className="  px-4 py-2">Total</td>
                            <td className=" px-12 py-2">{cartList.reduce((total, item) => total + item.quantity, 0)}</td>
                            <td className="text-right px-4 py-2">{total.toFixed(2)}</td>
                        </tr>
                        <tr className='mt-5 font-bold text-heading'>
                            <td colSpan={4} className="  px-4 py-2">Selected Dress Price </td>

                            <td className=" px-12 py-2"> </td>
                            <td className="text-right px-4 py-2">{selectedTotal?.toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>


                <div className='flex items-center justify-end gap-5 pt-10'>
                    <button onClick={() => clearFromCart()} className='bg-pink font-semibold text-white px-8 py-2 rounded-md'>Clear Cart</button>
                    <button className='font-semibold border border-gray-200 px-8 py-2 rounded-md'> <Link to='/dresses'>Continue Shopping</Link> </button>
                    <button className='bg-violet-500 font-semibold text-white px-8 py-2 rounded-md'> <Link to='/Checkout'> Checkout </Link> </button>
                </div>
            </section>
        </section>
    )
}

export default CartPage