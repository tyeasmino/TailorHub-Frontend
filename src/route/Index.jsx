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
import Checkout from '../pages/Checkout' 
import OrdersPage from '../pages/OrdersPage'
import Details from '../pages/Details'
import Cart from '../pages/Cart'
import AllProfiles from '../pages/AllProfiles' 
import ProfileDetailsPage from '../pages/ProfileDetailsPage'

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
                <Route path='/profile' element={<ProfilePage />} />
                <Route path='/inventory' element={<InventoryPage />} />
                <Route path='/inventory-movement' element={<InventoryMovementPage />} />
                <Route path='/measurement' element={<DressMeasurementPage />} />
                <Route path='/orders' element={<OrdersPage />} />





                <Route path="/profiles" element={<AllProfiles/>} />
                <Route path="/profiles/:id" element={<ProfileDetailsPage />} />
                <Route path="/dresses" element={<AllDresses/>} />
                <Route path="/dresses/:id" element={<Details />} />
                <Route path='/cart' element={<Cart />} />

                {/* NOT Using, BUT created based on first thinking */}
                <Route path="/dresses/:id/details" element={<DetailsPage />} />
                <Route path='/cart2' element={<CartPage />} />
                <Route path='/checkout' element={<Checkout />} />
                 
            </Routes>
            <Footer />
        </BrowserRouter>
        </AuthProvider>
    </div>
  )
}

export default Index