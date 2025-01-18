import React from 'react'
import blueFlower from '../assets/fabric/blueflower.png'
import orangeFlower from '../assets/fabric/orangeflower.png'
import redFlower from '../assets/fabric/redflower.png'


const CartPage = ({ dress }) => {
    
    return (
        <section className='flex '>

            {/* <section className='mx-64 p-10 max-w-screen-2xl w-full'>
        </section> */}
            <section className="flex rounded-3xl flex-col m-auto shadow-lg my-20 p-10 max-w-screen-lg w-full">
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-3xl font-bold">Your Cart</h2>
                </div>

                {/* Table to display inventory items */}
                <table className="table-auto w-full text-left">
                    <thead>
                        <tr className='border-b'>
                            <th className=" px-4 py-2">Item</th>
                            <th className=" px-4 py-2">Fabric Type</th>
                            <th className=" px-4 py-2">Color</th>
                            <th className=" px-4 py-2">Qnt</th>
                            <th className=" px-4 py-2">Price</th>
                        </tr>
                    </thead>
                    <tbody>



                        <tr className='border-b'>
                            <td className="flex items-center gap-5 px-4 py-2">
                                <img className='w-10 rounded-full h-10' src={dress?.image} alt="" />
                                <h3 className=''> {dress?.name} </h3>
                            </td>
                            <td className=" px-4 py-2">Cotton</td>
                            <td className=" px-4 py-2">Blue</td>
                            <td className=" px-4 py-2">1</td>
                            <td className=" px-4 py-2">{dress?.discount_price || dress?.base_price}</td>
                        </tr>
                         


                        <tr className='mt-5 font-bold text-heading'>
                            <td colSpan={3} className="  px-4 py-2">Total</td>
                            <td className=" px-4 py-2">4</td>
                            <td className=" px-4 py-2">$356.00</td>
                        </tr>
                    </tbody>
                </table>


                <div className='flex items-center justify-end gap-5 pt-10'>
                    <button className='font-semibold border border-gray-200 px-8 py-2 rounded-md'>Continue Shopping</button>
                    <button className='bg-violet-500 font-semibold text-white px-8 py-2 rounded-md'>Checkout</button>
                </div>
            </section>
        </section>
    )
}

export default CartPage