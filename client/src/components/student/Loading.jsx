// Importing React hooks and routing utilities
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

// Loading component (used for redirection with a spinner)
const Loading = () => {

  // Getting dynamic path from URL parameters
  const {path} = useParams()

  // Hook for programmatic navigation
  const navigate = useNavigate();

  // Effect to redirect after a delay
  useEffect(()=>{
       if(path){

        // Set timeout to navigate after 5 seconds
        const timer = setTimeout(()=>{
          navigate(`/${path}`)
        },5000)

        // Cleanup function to clear timer when component unmounts
        return ()=>clearTimeout(timer)
       }
  },[])

  return (
    // Full-screen centered loader
    <div className='min-h-screen flex items-center justify-center'>

      {/* Spinner animation */}
      <div className='w-16 sm:w-20 aspect-square border-4 border-gray-300 border-t-4 border-t-blue-400 rounded-full animate-spin'>

      </div>
    </div>
  )
}

// Exporting component
export default Loading
