// Importing required libraries, assets, routing, context, and utilities
import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { useClerk,UserButton,useUser } from '@clerk/clerk-react'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

// Navbar component
const Navbar = () => {

  // Check if current page is course list (for dynamic styling)
  const isCourseListPage = location.pathname.includes('/course-list')
 
  // Clerk authentication hooks
  const {openSignIn} = useClerk()
  const {user} = useUser()

  // Global app context values
  const {navigate,isEducator,backendUrl,setIsEducator,getToken} = useContext(AppContext)

  // Function to switch user role to educator
  const becomeEducator = async()=>{
    try {
      // If already educator → redirect to dashboard
      if(isEducator){
        navigate('/educator')
        return;
      }

      // Get auth token and call backend API
      const token = await getToken()
      const {data} = await axios.get(backendUrl+'/api/educator/update-role',{
        headers:{Authorization:`Bearer ${token}`}
      })

      // Handle API response
      if(data.success){
        setIsEducator(true)
        toast.success(data.message)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      // Error handling
      toast.error(error.message)
    }
  }

  return (
    // Navbar container with responsive padding and dynamic background
    <div className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 ${isCourseListPage ? 'bg-white':'bg-cyan-100/70'} `} >

      {/* Logo (navigates to home) */}
      <img onClick={()=>navigate('/')} src={assets.logo} alt="logo" className='w-28 lg:w-32 cursor-pointer'/>

      {/* Desktop menu */}
      <div className='hidden md:flex items-center gap-5 text-gray-500'>

         <div className='flex items-center gap-5'>

        {/* Show options only if user is logged in */}
        { user && (
          <>
           <button onClick={becomeEducator}>
            {isEducator?'EducatorDashboard':'Become Educator'}
           </button>

          | <Link to='/my-enrollments'>My Enrollments</Link> 
          </>
        )
        }
         </div>

         {/* User profile or sign-in button */}
         {user ? <UserButton/> :
          <button onClick={()=>openSignIn()} className='bg-blue-600 text-white px-5 py-2 rounded-full '>
            Create Account
          </button>}
      </div>

     {/* Mobile menu */}
      <div className='md:hidden flex items-center gap-2 sm:gap-5 text-gray-500'>

          <div className='flex items-center gap-1 am:gap-2 max-sm:text-xs'>

            {/* Logged-in user options */}
            { user && (
          <>
            <button onClick={becomeEducator}>
              {isEducator?'EducatorDashboard':'Become Educator'}
            </button>

          | <Link to='/my-enrollments'>My Enrollments</Link> 
          </>
        )
        }
          </div>

         {/* Profile icon or sign-in icon */}
         {
          user 
          ? <UserButton/> 
          : <button onClick={()=>openSignIn()}>
              <img src={assets.user_icon} alt="" />
            </button>
         }
      </div>
    </div>
  )
}

// Exporting component
export default Navbar
