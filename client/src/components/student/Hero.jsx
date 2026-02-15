// Importing React, assets (images), and SearchBar component
import React from 'react'
import { assets } from '../../assets/assets'
import SearchBar from './SearchBar'

// Hero component (landing section)
const Hero = () => {
  return (
    // Main container with centered layout, spacing, and gradient background
    <div className='flex flex-col items-center justify-center w-full md:pt-36 pt-20 px-7 md:px-0 space-y-7 text-center bg-gradient-to-b from-cyan-100/70'>

      {/* Main heading with highlighted text and decorative image */}
      <h1 className='md:text-home-heading-large text-home-heading-small relative font-bold text-gray-800 max-w-3xl mx-auto'>
        Empower your future with the courses designed to 
        <span className='text-blue-600'>fit your choice.</span>

        {/* Decorative sketch image (visible only on medium screens and above) */}
        <img 
          src={assets.sketch} 
          alt=""  
          className='md:block hidden absolute -bottom-7 right-0'
        />
      </h1>

      {/* Description for larger screens */}
      <p className='md:block hidden text-gray-500 max-w-2xl mx-auto'>
        we bring together world-class instructors,interactive content ,and a supportive community to help you achieve your personal and proffessional goals 
      </p>

      {/* Short description for small screens */}
      <p className='md:hidden text-gray-500 max-w-sm mx-auto'>
        we bring together world-class instructors o help you achieve your proffessional goals
      </p>

      {/* Search bar component */}
      <SearchBar/>

    </div>
  )
}

// Exporting component
export default Hero
