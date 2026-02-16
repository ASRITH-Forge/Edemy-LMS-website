// Importing React and assets (company logos)
import React from 'react'
import { assets } from '../../assets/assets'

// Companies component (displays trusted brand logos)
const Companies = () => {
  return (
    // Section container with top padding
    <div className='pt-16'>

      {/* Section title */}
      <p className='text-base text-gray-500'>
        Trusted by learners from
      </p>

      {/* Logos container with responsive spacing */}
      <div className='flex flex-wrap items-center justify-center gap-6 md:gap-16 md:mt-10 mt-5'>

        {/* Company logos */}
        <img src={assets.microsoft_logo} alt="Microsoft"  className='w-20 md:w-28'/>
        <img src={assets.walmart_logo} alt="Walmart"  className='w-20 md:w-28'/>
        <img src={assets.accenture_logo} alt="Accenture"  className='w-20 md:w-28'/>
        <img src={assets.adobe_logo} alt="Adobe"  className='w-20 md:w-28'/>
        <img src={assets.paypal_logo} alt="Paypal"  className='w-20 md:w-28'/>

      </div>
    </div>
  )
}

// Exporting component
export default Companies
