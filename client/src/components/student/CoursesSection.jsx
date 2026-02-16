// Importing required hooks, routing, context, and components
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import CourseCard from './CourseCard'

// CoursesSection component (displays top courses)
const CoursesSection = () => {

  // Getting all courses data from global context
  const {allCourses} = useContext(AppContext)

  return (
    // Section container with responsive padding
    <div className='py-16 md:px-40 px-8'>

      {/* Section heading */}
      <h2 className='text-3xl font-medium text-gray-800'>
        Learn from the best
      </h2>

      {/* Description */}
      <p className='text-sm md:text-base text-gray-500 mt-3'>
        Discover our top rated courses across various categories.From coding and design to <br/>
        business and wellness,our courses are crafted to deliver results
      </p>
      
      {/* Courses grid (showing only first 4 courses) */}
      <div className='grid grid-cols-auto px-4 md:px-0 md:my-16 my-10 gap-4'>
        {allCourses.slice(0,4).map((course,index)=>
          <CourseCard key={index} course={course}/>
        )}
      </div>
 
      {/* Navigation to full course list */}
      <Link 
        to={'/course-list'} 
        onClick={()=>window.scrollTo(0.0)}
        className=' text-gray-500 border border-gray-500/30 px-10 py-3 rounded'
      >
        show all courses
      </Link>
     
    </div>
  )
}

// Exporting component
export default CoursesSection
