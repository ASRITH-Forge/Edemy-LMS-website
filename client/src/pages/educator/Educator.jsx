// Importing React, routing outlet, and layout components
import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/educator/Navbar'
import SideBar from '../../components/educator/SideBar'
import Footer from '../../components/educator/Footer'

// Educator layout component (wrapper for educator pages)
const Educator = () => {
  return (
    // Main layout container
    <div className='text-default min-h-screen bg-white'>

      {/* Top navigation */}
      <Navbar/>

      {/* Sidebar + page content */}
      <div className='flex'> 

        {/* Sidebar navigation */}
        <SideBar/>

        {/* Dynamic routed content */}
        <div className='flex-1'>
          {<Outlet/>} 
        </div>

      </div>

      {/* Footer */}
      <Footer/>
    </div>
  )
}

// Exporting component
export default Educator
