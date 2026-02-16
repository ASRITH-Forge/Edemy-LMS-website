// Importing React and assets (icons/images)
import React from 'react'
import { assets } from '../../assets/assets'

// CallToAction component (landing section)
const CallToAction = () => {
  return (
    // Container with centered layout and responsive padding
    <div className='flex flex-col items-center gap-4 pt-10 pb-24 px-8 md:px-0'>

      {/* Main heading */}
      <h1 className='text-xl md:text-4xl text-gray-800 font-semibold'>
        Learn anything,anytime,anywhere
      </h1>

      {/* Supporting description text */}
      <p className='text-gray-800 sm:text-sm'>
        Incididunt sint fugiat pariatur cupidatat consectetur sit cillium anim id venim aliqua prodient execpteur commodo doea.
      </p>

      {/* Action buttons */}
      <div className='flex items-center font-medium gap-6 mt-4'>

        {/* Primary CTA button */}
        <button className='px-10 py-3 rounded-md text-white bg-blue-600'>
          Get Started
        </button>

        {/* Secondary CTA with icon */}
        <button className='flex items-center gap-2'>
          Learn more 
          <img src={assets.arrow_icon} alt="arrow_icon" />
        </button>

      </div>
    </div> 
  )
}

// Exporting component
export default CallToAction
