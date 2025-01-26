import React, { useContext, useState } from 'react'
import { GoArrowLeft } from "react-icons/go";
import loginBG from '../assets/cool-background.png'
import { AuthContext } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router';
import axios from 'axios';

const W3Login = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    })

    const { login } = useContext(AuthContext)
    const [successTitle, setSuccessTitle] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const navigate = useNavigate()


    const handleChange = (e) => {
        // console.log(e.target.value);
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // console.log(formData) 
        try {
            const res = await axios.post(
                "http://127.0.0.1:8000/accounts/login/",
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );


            if (res.status === 200 && !res.data.error) {
                setSuccessTitle('Success')
                setSuccessMessage('Login Successful')

                localStorage.setItem('token', res.data.token)


                const loginSuccess = await login(formData)
                if (loginSuccess) {
                    console.log('successful login');
                    navigate('/dashboard')
                }

                setFormData({
                    username: "",
                    password: "",
                })
                console.log('done');
            } else {
                console.log('failed');
                setSuccessTitle('Failed')
                setSuccessMessage('Login Failed. Please check your credentials and try again')
            }
        } catch (error) {
            console.error(error)
            setSuccessTitle('Failed')
            setSuccessMessage('An error occurred. Please try again')
        }
    };


    return (
        <section className='relative flex items-center justify-center min-h-screen'>
            <img className='absolute z-0 h-[800px] w-full  object-cover overflow-hidden' src={loginBG} alt="" />
            <div className='z-10 w-[480px] p-16 rounded-lg bg-[#1b7da3]'>
                <div className='mb-10 flex justify-between'>
                    <h3 className='text-white font-semibold relative text-xl'>LOGIN
                        <span className='w-[60px] h-1 bg-[#2cc9c9] absolute left-0 -bottom-1 '></span>
                    </h3>
                    <h3 className='text-white font-semibold text-xl'>
                        <Link to='/w3signup'>SIGNUP</Link>
                    </h3>
                </div>
                <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
                    <input
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className='outline-none placeholder-[#a6cece] text-white ring-transparent bg-transparent py-3 border-b border-blue-900' type="text" placeholder='Email or Username' />
                    <input
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                        className='outline-none placeholder-[#a6cece] text-white ring-transparent bg-transparent py-3 border-b border-blue-900' type="password" placeholder='Password' />

                    <div className='text-white text-xl flex  gap-3 items-center'>
                        <input className='outline-none w-5 h-5 ring-0 ' type="checkbox" name='remember' />
                        <label htmlFor="remember">Remember Me</label>
                    </div>

                    <button type="submit" className='rounded-full w-fit px-12 py-2 text-white  bg-[#2cc9c9]'>Login</button>
                    <div className='text-white flex gap-3 items-center'>
                        <GoArrowLeft />
                        <span className='border-b border-blue-900'>Forgot your password?</span>
                    </div>
                </form>

                {successMessage && (<div className="bg-heading absolute -right-3 -bottom-7  md:right-16 md:-bottom-28 rounded-br-md border-l-4 border-green-500 text-white p-1 md:p-4 mb-4" role="alert">
                    <p className="font-bold"> {successTitle} </p>
                    <p className="hidden md:block">{successMessage}</p>
                </div>)}

            </div>
        </section>
    )
}

export default W3Login