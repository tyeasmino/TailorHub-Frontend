import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from '../pages/Home'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import LoginPage from '../pages/LoginPage'
import Dashboard from '../pages/Dashboard'
import RegistrationPage from '../pages/RegistrationPage'
import { AuthProvider } from '../contexts/AuthContext'
import ProfilePage from '../pages/ProfilePage'
import DressMeasurementPage from '../pages/DressMeasurementPage'
import InventoryPage from '../pages/InventoryPage'
import DetailsPage from '../pages/DetailsPage'
import CartPage from '../pages/CartPage'
import InventoryMovementPage from '../pages/InventoryMovementPage'
import AllDresses from '../pages/AllDresses'

const Index = () => {
  return (
    <div>
      <AuthProvider>
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/registration' element={<RegistrationPage />} />
                <Route path='/dashboard' element={<Dashboard />} /> 

                <Route path="/dresses" element={<AllDresses/>} />
                <Route path="/dresses/:id" element={<DetailsPage />} />
                <Route path='/cart' element={<CartPage />} />
                <Route path='/inventory' element={<InventoryPage />} />
                <Route path='/inventory-movement' element={<InventoryMovementPage />} />
                <Route path='/measurement' element={<DressMeasurementPage />} />
                <Route path='/profile' element={<ProfilePage />} />
            </Routes>
            <Footer />
        </BrowserRouter>
        </AuthProvider>
    </div>
  )
}

export default Index