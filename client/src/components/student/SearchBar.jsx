// Importing React, assets, routing hook, and state hook
import React from 'react'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

// SearchBar component (handles course search input)
const SearchBar = ({data}) => {
     
  // Hook for navigation
  const navigate = useNavigate()

  // State to manage input field (pre-filled if data is provided)
  const [input, setInput] = useState(data ? data : '')

  // Handle form submission (search action)
  const onSearchHandler = (e) =>{
    e.preventDefault()

    // Navigate to course list with search query
    navigate('/course-list/' + input)
  }

  return (
      // Search form container
      <form 
        onSubmit={onSearchHandler} 
        action="" 
        className='max-w-xl w-full md:h-14 h-12 flex items-center bg-white border border-gray-500/20 rounded'
      >

        {/* Search icon */}
        <img src={assets.search_icon} alt="search_icon" className='md:w-auto w-10 px-3'/>

        {/* Input field */}
        <input 
          onChange={e => setInput(e.target.value)} 
          value={input}
          type="text"  
          placeholder='Search for courses' 
          className='w-full h-full outline-none text-gray-500/80' 
        />

        {/* Submit button */}
        <button  
          type='submit' 
          className='bg-blue-600 rounded text-white md:px-10 px-7 md:py-3 py-2 mx-1'
        >
          Search
        </button>

      </form>
  )
}

// Exporting component
export default SearchBar
