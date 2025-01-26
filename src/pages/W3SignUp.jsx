
import React, { useState } from 'react'
import loginBG from '../assets/cool-background.png'
import { Link } from 'react-router'
import axios from 'axios'



const W3SignUp = () => {

    const [formData, setFormData] = useState({
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirm_password: "",
        user_type: "fitFinder",
    })
    
    const [successTitle, setSuccessTitle] = useState("")
    const [successMessage, setSuccessMessage] = useState("")

    const handleChange = (e) => {
        // console.log(e.target.value);
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        console.log(formData) 


        try { 
            const res = await axios.post(
            "http://127.0.0.1:8000/accounts/register/",
            formData,

            {
                headers: {
                'Content-Type': 'application/json',
                },
            }
            );
        
            console.log(res.status);
            if (res.status === 201) {
            setSuccessTitle('Success')
            setSuccessMessage('Registration is DONE. Check the mail to active your account')
            setFormData({
                username: "",
                first_name: "",
                last_name: "",
                email: "",
                password: "",
                confirm_password: "",
                user_type: "fitFinder",
            })
            console.log('done');
            } else {
           
            setSuccessTitle('Failed')
            setSuccessMessage(res.data.error || 'Form registration has been failed. Please try again')
            }
        } catch (error) {
            console.log(error)
            setSuccessTitle('Failed')

            if (error.response && error.response.data) {
                const errorData = error.response.data

                if(errorData.username) {
                    setSuccessMessage('Username already exists') 
                } else if(errorData.email) {
                    setSuccessMessage('Email already exists') 
                } else if(errorData.password) {
                    setSuccessMessage('Password did not match') 
                } else {
                    setSuccessMessage(errorData.error || 'An error occurred. Please try again') 
                }
            } else {
                setSuccessMessage('An error occurred. Please try again') 
            }

        }
    };


    return (
        <section className='relative flex items-center justify-center min-h-screen'>
            <img className='absolute z-0 h-[800px] w-full  object-cover overflow-hidden' src={loginBG} alt="" />
            <div className='z-10 w-[480px] p-16 rounded-lg bg-[#1b7da3]'>
                <div className='mb-10 flex justify-between'>
                    <h3 className='text-white font-semibold text-xl'><Link to='/w3login'>LOGIN</Link>
                    </h3>
                    <h3 className='text-white font-semibold relative text-xl'>SIGNUP
                        <span className='w-[70px] h-1 bg-[#2cc9c9] absolute left-0 -bottom-1 '></span>
                    </h3>
                </div>

                <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
                    <input
                        value={formData.username}
                        onChange={handleChange}
                        name="username" 
                        className='outline-none placeholder-[#a6cece] text-white ring-transparent bg-transparent py-3 border-b border-blue-900' 
                        type="text" 
                        placeholder='Username' />

                    <div className='flex gap-4'>
                        <input
                            value={formData.first_name}
                            onChange={handleChange}
                            name="first_name" 
                            className='outline-none w-1/2 placeholder-[#a6cece] text-white ring-transparent bg-transparent py-3 border-b border-blue-900' type="text" placeholder='First Name' />
                        
                        <input
                            value={formData.last_name}
                            onChange={handleChange}
                            name="last_name" 
                            className='outline-none w-1/2 placeholder-[#a6cece] text-white ring-transparent bg-transparent py-3 border-b border-blue-900' type="text" placeholder='Last Name' />
                    </div>

                    <input
                        value={formData.email}
                        onChange={handleChange}
                        name="email" 
                        className='outline-none placeholder-[#a6cece] text-white ring-transparent bg-transparent py-3 border-b border-blue-900' type="email" placeholder='Email' />

                    <div className='flex gap-4'>
                        <input
                            name='password' 
                            value={formData.password}
                            onChange={handleChange}
                            className='outline-none w-1/2 placeholder-[#a6cece] text-white ring-transparent bg-transparent py-3 border-b border-blue-900' type="password" placeholder='Password' />
                        <input
                            value={formData.confirm_password}
                            onChange={handleChange}
                            name='confirm_password' 
                            className='outline-none w-1/2 placeholder-[#a6cece] text-white ring-transparent bg-transparent py-3 border-b border-blue-900' type="password" placeholder='Confirm Password' />
                    </div>

                    <div className="flex items-center ">
                        <input type="radio" id='fitFinder'
                            value='fitFinder'
                            onChange={handleChange}
                            name="user_type" className="radio " defaultChecked />
                        <label htmlFor="fitFinder" className="w-full py-4 ms-2 text-sm font-medium text-white">Fit Finder</label>

                        <input type="radio" id='fitMaker'
                            value='fitMaker'
                            onChange={handleChange}
                            name="user_type" className="radio mr-2" />
                        <label htmlFor="fitMaker" className="w-full py-4 ms-2 text-sm font-medium text-white">Fit Maker</label>
                    </div>


                    <button type="submit" className='rounded-full w-fit px-12 py-2 text-white  bg-[#2cc9c9]'>Sign Up</button>

                </form>

                {successMessage && (<div className="bg-heading absolute -right-3 -bottom-7  md:right-16 md:-bottom-28 rounded-br-md border-l-4 border-green-500 text-white p-1 md:p-4 mb-4" role="alert">
                    <p className="font-bold"> {successTitle} </p>
                    <p className="hidden md:block">{successMessage}</p>
                </div>)}
            </div>
        </section>
    )
}

export default W3SignUp