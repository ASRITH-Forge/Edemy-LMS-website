// Importing required modules, assets, and libraries
import React from 'react'
import { assets, dummyEducatorData } from '../../assets/assets'
import {UserButton,useUser} from '@clerk/clerk-react'
import { Link } from 'react-router-dom'

// Navbar component
const Navbar = () => {

  // Dummy educator data (currently not used but available if needed)
  const educatorData = dummyEducatorData

  // Getting current user details from Clerk authentication
  const {user} = useUser() 

  return (
    // Navbar container with responsive padding and bottom border
    <div className='flex items-center justify-between px-4 md:px-8 border-b border-gray-500 py-3'>

      {/* Logo section with navigation to home page */}
      <Link to='/'>
        <img src={assets.logo} alt="Logo" className='w-28 lg:w-32' />
      </Link>

      {/* Right section: Greeting + User/Profile */}
      <div className='flex items-center gap-5 text-gray-500 relative'>

        {/* Display user's name if logged in, else default text */}
        <p>Hi! {user ? user.fullName : 'Developers'}</p>

        {/* Show Clerk UserButton if logged in, else show default profile image */}
        {user ? <UserButton/>: <img src={assets.profile_img} alt="" className='max-w-8'/> }

      </div>
    </div>
  )
}

// Exporting Navbar component for use across the application
export default Navbar
