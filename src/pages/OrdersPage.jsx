import React, { useContext } from 'react' 
import { AuthContext } from '../contexts/AuthContext';
import Sidebar from '../components/Sidebar';
import FitMakerOrders from '../components/fitMaker/FitMakerOrders';
import FitFinderOrders from '../components/fitFinder/FitFinderOrders';

const OrdersPage = () => {
    const { user } = useContext(AuthContext);
    console.log(user)

    return (
        <section className='flex'>
            <Sidebar />

            <section className='ml-14 md:mx-64 md:p-10 md:max-w-screen-2xl w-full'>
                {(user && user.fitMaker) ?
                    (<> <FitMakerOrders /> </>) : (<></>)}

                {(user && user.fitFinder) ?
                    (<> <FitFinderOrders /> </>) : (<></>)}
            </section>
        </section>
    )
}


export default OrdersPage