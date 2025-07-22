import React, { useState } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import CarDetails from './pages/CarDetails'
import Cars from './pages/Cars'
import Home from './pages/Home'
import Footer from './components/Footer'
import MyBookings from './pages/MyBookings'
import Layout from './pages/Owner/Layout';
import Dashboard from './pages/Owner/Dashboard';
import AddCar from './pages/Owner/AddCar';
import CarsManage from './pages/Owner/CarsManage'
import BookingsManage from './pages/Owner/BookingsManage'
import Login from './components/Login'
import { Toaster } from 'react-hot-toast'
import { useAppContext } from './context/AppContext'

const App = () => {

   const {showLogin} = useAppContext()
   const isOwnerPath = useLocation().pathname.startsWith('/owner')
  return (
    <>
    <Toaster />

      {showLogin && <Login />}
      {!isOwnerPath && <Navbar />}
        
      <Routes>
        <Route path="/" element = {<Home/>}/>
        <Route path="/car-details/:id" element={<CarDetails/>}/>
        <Route path="/cars" element={<Cars/>}/>
        <Route path="/my-bookings" element={<MyBookings/>}/>
        <Route path="/Owner" element={<Layout/>}>
          <Route index element={<Dashboard/>} />
          <Route path="add-car" element={<AddCar />} />
          <Route path="cars-manage" element={<CarsManage/>} />
          <Route path="manage-booking" element={<BookingsManage/>} />
        </Route>
      </Routes>

      {!isOwnerPath && <Footer />}
      

    </>
  )
}

export default App
