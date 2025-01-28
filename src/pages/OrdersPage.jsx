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

            <section className='mx-64 p-10 max-w-screen-2xl w-full'>
                {(user && user.fitMaker) ?
                    (<> <FitMakerOrders /> </>) : (<></>)}

                {(user && user.fitFinder) ?
                    (<> <FitFinderOrders /> </>) : (<></>)}
            </section>
        </section>
    )
}


export default OrdersPage