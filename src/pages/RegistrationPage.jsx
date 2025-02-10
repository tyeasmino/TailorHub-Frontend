import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router'

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

                if (errorData.username) {
                    setSuccessMessage('Username already exists')
                } else if (errorData.email) {
                    setSuccessMessage('Email already exists')
                } else if (errorData.password) {
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
            <section className='max-w-xl rounded-xl p-8 my-20 m-auto bg-white shadow-xl'>
                <div className='flex flex-col gap-5'>
                    <div className="text-center">
                        <h2 className='text-gray-800 text-4xl font-semibold'>Create an Account</h2>
                        <p className='text-gray-500 mt-2'>Please fill in the details below to register.</p>
                    </div>

                    <form className="w-full space-y-5" onSubmit={handleSubmit}>
                        <div>
                            <input
                                value={formData.username}
                                onChange={handleChange}
                                name="username"
                                type="text"
                                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-violet-500 transition-all duration-300 ease-in-out hover:shadow-md"
                                placeholder="Username"
                                required
                            />
                        </div>

                        <div className='flex gap-5 justify-between'>
                            <div className='w-1/2'>
                                <input
                                    value={formData.first_name}
                                    onChange={handleChange}
                                    name="first_name"
                                    type="text"
                                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-violet-500 transition-all duration-300 ease-in-out hover:shadow-md"
                                    placeholder="First Name"
                                    required
                                />
                            </div>

                            <div className='w-1/2'>
                                <input
                                    value={formData.last_name}
                                    onChange={handleChange}
                                    name="last_name"
                                    type="text"
                                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-violet-500 transition-all duration-300 ease-in-out hover:shadow-md"
                                    placeholder="Last Name"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <input
                                value={formData.email}
                                onChange={handleChange}
                                name="email"
                                type="email"
                                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-violet-500 transition-all duration-300 ease-in-out hover:shadow-md"
                                placeholder="Email Address"
                                required
                            />
                        </div>

                        <div className='flex gap-5 justify-between'>
                            <div className='w-1/2'>
                                <input
                                    value={formData.password}
                                    onChange={handleChange}
                                    name="password"
                                    type="password"
                                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-violet-500 transition-all duration-300 ease-in-out hover:shadow-md"
                                    placeholder="Password"
                                    required
                                />
                            </div>

                            <div className='w-1/2'>
                                <input
                                    value={formData.confirm_password}
                                    onChange={handleChange}
                                    name="confirm_password"
                                    type="password"
                                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-violet-500 transition-all duration-300 ease-in-out hover:shadow-md"
                                    placeholder="Confirm Password"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-6">
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="fitFinder"
                                    value="fitFinder"
                                    onChange={handleChange}
                                    name="user_type"
                                    className="radio"
                                    defaultChecked
                                />
                                <label htmlFor="fitFinder" className="text-gray-600 ml-2">Fit Finder</label>
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    id="fitMaker"
                                    value="fitMaker"
                                    onChange={handleChange}
                                    name="user_type"
                                    className="radio"
                                />
                                <label htmlFor="fitMaker" className="text-gray-600 ml-2">Fit Maker</label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 bg-black text-white rounded-lg font-semibold transition-all duration-300 ease-in-out hover:bg-violet-700 focus:outline-none focus:ring-4 focus:ring-violet-300 transform  "
                        >
                            Register
                        </button>
                    </form>

                    <p className="text-center mt-6 text-gray-500">Already have an account? <Link to='/login' className="text-violet-600 hover:text-violet-800">Login</Link></p>

                    {successMessage && (
                        <div
                            className="bg-green-500 text-white rounded-lg mt-5 p-3 text-center shadow-md transform transition-all duration-300 ease-in-out"
                            role="alert"
                        >
                            <p className="font-bold">{successTitle}</p>
                            <p>{successMessage}</p>
                        </div>
                    )}
                </div>
            </section>
        </section>
    )
}

export default RegistrationPage