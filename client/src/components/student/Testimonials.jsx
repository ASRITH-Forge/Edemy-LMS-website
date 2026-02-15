// Importing React, assets, and dummy testimonial data
import React from 'react'
import { assets, dummyTestimonial } from '../../assets/assets'

// Testimonials component (displays user feedback cards)
const Testimonials = () => {
  return (
    // Section container with padding
    <div className='pb-14 px-8 md:px-0'>

        {/* Section heading */}
        <h2 className='text-3xl font-medium text-gray-800'>
          Testimonials
        </h2>

        {/* Description */}
        <p className='md:text-base text-gray-500 mt-3'>
          Hear from learners as they share their journeys of transformation,sucess ,and our <br/>
          platform has made a difference in their lives.
        </p>

       {/* Testimonials grid */}
       <div className='grid grid-cols-auto gap-8 mt-14'>

        {/* Loop through testimonial data */}
        {dummyTestimonial.map((testimonial,index)=>(

          // Individual testimonial card
          <div 
            key={index} 
            className='text-sm text-left border border-gray-500/30 pb-6 rounded-lg bg-white shadow-[0px_4px_15px_0px] shadow-black/5 overflow-hidden '
          >

              {/* User info (image + name + role) */}
              <div className='flex items-center gap-4 px-5 py-4 bg-gray-500/10'>
                <img 
                  className='h-12 w-12 rounded-full' 
                  src={testimonial.image} 
                  alt={testimonial.name}
                />
                <div>
                  <h1 className='text-lg font-medium text-gray-800'>
                    {testimonial.name}
                  </h1>
                  <p className='text-gray-800/80'>
                    {testimonial.role}
                  </p>
                </div>
              </div>

              {/* Feedback section */}
              <div className='p-5 pb-7'>

                  {/* Star rating */}
                  <div className='flex gap-0.5'>
                    {[...Array(5)].map((_,i)=>(
                      <img 
                        className='h-5' 
                        key={i} 
                        src={i < Math.floor(testimonial.rating) ? assets.star : assets.star_blank} 
                        alt="star" 
                      />
                    ))}
                  </div>

                  {/* Feedback text */}
                  <p className='text-gray-500 mt-5'>
                    {testimonial.feedback}
                  </p>
                </div>

                {/* Read more link */}
                <a href="#" className='text-blue-500 underline px-5'>
                  Read more
                </a>
          </div>
        ))}
       </div>
   
    </div>
  )
}

// Exporting component
export default Testimonials
