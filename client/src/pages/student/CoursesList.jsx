// Importing hooks, context, routing, components, and assets
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import SearchBar from '../../components/student/SearchBar'
import { data, useParams } from 'react-router-dom'
import CourseCard from '../../components/student/CourseCard'
import { assets } from '../../assets/assets'
import Footer from '../../components/student/Footer'

// CoursesList component (search + filter courses)
const CoursesList = () => {

  // Context values
  const { navigate,allCourses} = useContext(AppContext)
  
  // Get search input from URL params
  const {input}= useParams()

  // State for filtered courses
  const [filteresCourse,setfilteredCourse] = useState([])

  // Filter courses based on input
  useEffect(() => {
    
   if(allCourses && allCourses.length >0){
    const tempCourses = allCourses.slice()

    input ? 
        setfilteredCourse(
          tempCourses.filter(
            item=>item.courseTitle.toLowerCase().includes(input.toLowerCase())
          )
        )
    : setfilteredCourse(tempCourses)
   }

  }, [allCourses,input])
  
  return (
    <>
      <div className='relative md:px-36 px-8 pt-20 text-left'>

        {/* Header + breadcrumb + search */}
        <div className='flex md:flex-row flex-col gap-6 items-start justify-between w-full'> 
          <div>
            <h1 className='text-4xl font-semibold text-gray-800'>Course List</h1>

            {/* Navigation breadcrumb */}
            <p className='text-gray-500'>
              <span className='text-blue-600 cursor-pointer' onClick={() => navigate('/')}>
                Home
              </span> / <span>Course List</span>
            </p>
          </div>

          {/* Search bar with pre-filled input */}
          <SearchBar data={input}/>
        </div>

        {/* Active search filter */}
        {
          input && (
            <div className='inline-flex items-center gap-4 px-4 py-2 border mt-8 mb-8 text-gray-600'>
              <p>{input}</p>

              {/* Clear filter */}
              <img 
                src={assets.cross_icon} 
                alt=""  
                className='cursor-pointer ' 
                onClick={()=>navigate('/Course-list')}
              />
            </div>
          )
        }

        {/* Courses grid */}
        <div className='grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-16 gap-3 px-2 md:p-0'>
           {filteresCourse.map((course,index)=>
             <CourseCard key={index} course={course}/>
           )}
        </div>
      </div>

      {/* Footer */}
      <Footer/>
    </>
  )
}

// Exporting component
export default CoursesList