import axios from 'axios'
import React, { useState } from 'react'

const RegistrationPage = () => {

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
            "https://tailor-hub-backend.vercel.app/accounts/register/",
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
        <section>
            <section className='max-w-screen-sm rounded-md p-10 my-20 m-auto shadow'>
                <div className='flex flex-col gap-5 relative'>
                    <div>
                        <h2 className='text-heading text-center text-3xl font-bold'>Register</h2>
                        <p className='text-center'>Create account with your details below</p>
                    </div>


                    <form className="max-w-sm mx-auto w-full" onSubmit={handleSubmit} >
                        <div className="mb-5">
                            <input
                                value={formData.username}
                                onChange={handleChange}
                                name="username" 
                                type="text" id="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Username" required />
                        </div>
                        <div className="mb-5">
                            <input
                                value={formData.first_name}
                                onChange={handleChange}
                                name="first_name" 
                                type="text" id="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="First name" required />
                        </div>
                        <div className="mb-5">
                            <input
                                value={formData.last_name}
                                onChange={handleChange}
                                name="last_name" 
                                type="text" id="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Last name" required />
                        </div>
                        <div className="mb-5">
                            <input
                                value={formData.email}
                                onChange={handleChange}
                                name="email" 
                                type="email" id="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email address" required />
                        </div>
                        <div className="mb-5">
                            <input
                                name='password' 
                                value={formData.password}
                                onChange={handleChange}
                                type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password" required />
                        </div> 
                        <div className="mb-2">
                            <input
                                value={formData.confirm_password}
                                onChange={handleChange}
                                name='confirm_password' 
                                type="password" id="confirm_password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Confirm Password" required />
                        </div> 
                        <div className="flex items-center mb-5  ">
                            <input type="radio" id='fitFinder'
                                value='fitFinder'
                                onChange={handleChange}
                                name="user_type" className="radio " defaultChecked />
                            <label htmlFor="fitFinder" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Fit Finder</label>


                            <input type="radio" id='fitMaker'
                                value='fitMaker'
                                onChange={handleChange}
                                name="user_type" className="radio mr-2" /> 
                            <label htmlFor="fitMaker" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Fit Maker</label>
                        </div> 
                        <button type="submit" className="text-white bg-heading focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full px-5 py-2.5 text-center dark:bg-pink dark:focus:ring-blue-800">Register</button>
                    </form>
                    <p className='text-gray-500 text-center'>Already have an Account? Login</p>

                    {successMessage && ( <div className="bg-heading absolute -right-3 -bottom-7  md:right-16 md:-bottom-28 rounded-br-md border-l-4 border-green-500 text-white p-1 md:p-4 mb-4" role="alert"> 
                                    <p className="font-bold"> {successTitle} </p> 
                                    <p className="hidden md:block">{successMessage}</p> 
                                </div> )}
                 
                </div>
            </section>
        </section>
    )
}

export default RegistrationPage