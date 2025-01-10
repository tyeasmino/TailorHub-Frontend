import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { AuthContext } from '../contexts/AuthContext'
import axios from 'axios'

const LoginPage = () => {

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
        <section className='max-w-screen-sm p-10 my-20 m-auto shadow'>
            <div className='flex flex-col gap-5 relative'>
                <div>
                    <h2 className='text-heading text-center text-3xl font-bold'>Login</h2>
                    <p className='text-center'>Please login using account details below</p>
                </div>


                <form className="max-w-sm mx-auto w-full" onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <input 
                            name="username" 
                            value={formData.username}
                            onChange={handleChange}
                            type="text" id="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Username" required />
                    </div>
                    <div className="mb-2">
                        <input
                            name='password'
                            value={formData.password}
                            onChange={handleChange}
                            type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password" required />
                    </div>
                    <div className='mb-5'>
                        <Link className='text-gray-500'>Forget your password?</Link>
                    </div>
                    <button type="submit" className="text-white bg-heading focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full px-5 py-2.5 text-center dark:bg-pink dark:focus:ring-blue-800">Login</button>
                </form>
                <p className='text-gray-500 text-center'>Don't have an Account? Create account</p>
            

                {successMessage && ( <div className="bg-heading absolute -right-3 -bottom-7  md:right-16 md:-bottom-28 rounded-br-md border-l-4 border-green-500 text-white p-1 md:p-4 mb-4" role="alert"> 
                                    <p className="font-bold"> {successTitle} </p> 
                                    <p className="hidden md:block">{successMessage}</p> 
                                </div> )}
            </div>
        </section>
    )
}

export default LoginPage