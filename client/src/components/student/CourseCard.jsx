// Importing required hooks, assets, context, and routing
import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'
import { Link } from 'react-router-dom'

// CourseCard component (displays individual course details)
const CourseCard = ({course}) => {

  // Getting currency and rating calculation function from context
  const {currency,calculateRating} = useContext(AppContext)

  return (
    // Navigates to course details page and scrolls to top on click
    <Link 
      to={'/course/' + course._id } 
      onClick={()=>scrollTo(0,0)}
      className='border border-gray-500/30 pb-6 overflow-hidden rounded-lg'
    >

      {/* Course thumbnail */}
      <img className='w-full ' src={course.courseThumbnail} alt="" />

      <div className='p-3 text-left'>

        {/* Course title */}
        <h3 className='text-base font-semibold'>{course.courseTitle}</h3>

        {/* Educator name */}
        <p className='text-gray-500'>{course.educator.name}</p>

        {/* Rating section */}
        <div className='flex items-center space-x-2'>

          {/* Numeric rating */}
          <p>{calculateRating(course)}</p>

          {/* Star rating (dynamic rendering of 5 stars) */}
          <div className='flex'>
            {[...Array(5)].map((_,i)=>(
              <img 
                className='w-3.5 h-3.5' 
                src={i < Math.floor(calculateRating(course)) ? assets.star : assets.star_blank} 
                key={i} 
                alt=''
              />
            ))}
          </div>

          {/* Total number of ratings */}
          <p className='text-gray-500'>{course.courseRatings.length}</p> 
        </div>

        {/* Course price after discount */}
        <p className='text-base forn-semibold text-gray-800'>
          {currency}
          {(course.coursePrice - course.discount * course.coursePrice / 100).toFixed(2)}
        </p>

      </div>
    </Link>
  )
}

// Exporting component
export default CourseCard
