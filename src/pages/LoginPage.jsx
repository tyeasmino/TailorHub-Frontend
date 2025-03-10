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
                "https://tailor-hub-backend.vercel.app/accounts/login/",
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
        <section className='w-11/12 md:max-w-xl rounded-xl p-8 m-auto my-20  bg-white shadow-xl'>
    <div className='flex flex-col gap-5'>
        <div className="text-center">
            <h2 className='text-gray-800 text-4xl font-semibold'>Login</h2>
            <p className='text-gray-500 mt-2'>Please login using your account details below.</p>
        </div>

        <form className="w-full space-y-5" onSubmit={handleSubmit}>
            <div>
                <input
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    type="text"
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-violet-500 transition-all duration-300 ease-in-out hover:shadow-md"
                    placeholder="Username"
                    required
                />
            </div>

            <div>
                <input
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                    type="password"
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-violet-500 transition-all duration-300 ease-in-out hover:shadow-md"
                    placeholder="Password"
                    required
                />
            </div>

            <div className="text-right">
                <Link to='/forgot-password' className="text-violet-600 hover:text-violet-800 text-sm">Forgot your password?</Link>
            </div>

            <button
                type="submit"
                className="w-full py-3 bg-black text-white rounded-lg font-semibold transition-all duration-300 ease-in-out hover:bg-violet-700 focus:outline-none focus:ring-4 focus:ring-violet-300 transform"
            >
                Login
            </button>
        </form>

        <p className="text-center mt-6 text-gray-500">
            Don't have an account? <Link to='/registration' className="text-violet-600 hover:text-violet-800">Create an account</Link>
        </p>

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

    )
}

export default LoginPage