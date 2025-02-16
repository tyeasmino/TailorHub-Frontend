import React, { useEffect, useState } from 'react'
import { FaMotorcycle } from "react-icons/fa6";
import { FaTruckFast } from "react-icons/fa6";
import { TbHours24 } from "react-icons/tb";
import { IoTimerOutline } from "react-icons/io5";
import { getServices } from '../apiServices/apiService';

const Services = () => {

    const [services, setServices] = useState([])

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const data = await getServices()
                setServices(data)
            } catch (error) {
                console.log('Failed to fetch servicse', error);
            }
        }

        fetchServices()
    }, [])


    const iconMappings = {
        "24/7 Support": <TbHours24 className='text-[50px] m-auto group-hover:text-white' />,
        "Free Delivery": <FaMotorcycle className='text-[50px] m-auto group-hover:text-white' />,
        "Delivery in outside": <FaTruckFast className='text-[50px] m-auto group-hover:text-white' />,
        "Delivery Time": <IoTimerOutline className='text-[50px] m-auto group-hover:text-white' />,
      };



    return (
        <section className='max-w-screen-xl m-auto my-10'>
            <h2 className='text-heading text-center font-semibold text-3xl' >What TailorHub Offer!</h2>

            <div className='flex flex-col md:flex-row gap-5 mt-10'>
                {services.length > 0 ? (
                    services.map(service => (
                        <div key={service.id} className='shadow shadow-pink md:shadow-slate-500 group transition-all duration-300 ease-in-out hover:bg-heading rounded py-10 md:w-1/4 px-6 mx-5 md:mx-0 text-justify flex flex-col gap-3'>
                            {iconMappings[service.name] || <FaMotorcycle className='text-[50px] m-auto group-hover:text-white' />}
                            <h4 className='text-heading text-center font-semibold text-xl group-hover:text-pink'>{service.name}</h4>
                            <p className='text-gray-500'>{service.description}</p>
                        </div>
                    ))
                ) : (
                    <p>Loading services...</p>
                )}
            </div>
        </section>
    )
}

export default Services
