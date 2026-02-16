// Importing hooks, context, loader, API, and utilities
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import Loading from '../../components/student/Loading'
import { toast } from 'react-toastify'
import axios from 'axios'

// MyCourses component (educator course management)
const MyCourses = () => {

  // Getting values from context
  const { currency, backendURL, isEducator, getToken } = useContext(AppContext)

  // State to store courses
  const [courses, setCourses] = useState(null)

  // Fetch educator courses from backend
  const fetchEducatorCourses = async () => {
    try {
      const token = await getToken()

      const { data } = await axios.get(
        backendURL + '/api/educator/courses',
        { headers: { Authorization: `Bearer ${token}` } }
      )

      data.success && setCourses(data.courses)

    } catch (error) {
      toast.error(error.message)
    }
  }

  // Delete a course
  const handleDelete = async (courseId) => {

    // Confirmation before delete
    if (!window.confirm("Are you sure you want to delete this course?")) return

    try {
      const token = await getToken()

      const { data } = await axios.delete(
        `${backendURL}/api/educator/delete-course/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      // Handle response
      if (data.success) {
        toast.success("Course deleted")
        fetchEducatorCourses() // Refresh list
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  // Fetch courses on mount if educator
  useEffect(() => {
    if (isEducator) {
      fetchEducatorCourses()
    }
  }, [])

  return courses ? (
    <div className='h-screen flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0'>

      <div className='w-full'>
        <h2 className='pb-4 text-lg font-medium'>My Courses</h2>

        {/* Courses table */}
        <div className='flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20'>

          <table className='md:table-auto table-fixed w-full overflow-hidden'>

            {/* Table header */}
            <thead className='text-gray-900 border-b border-gray-500/20 text-sm text-left'>
              <tr>
                <th className='px-4 py-3 font-semibold truncate'>All Courses</th>
                <th className='px-4 py-3 font-semibold truncate'>Earnings</th>
                <th className='px-4 py-3 font-semibold truncate'>Students</th>
                <th className='px-4 py-3 font-semibold truncate'>Published</th>
                <th className='px-4 py-3 font-semibold truncate'>Actions</th>
              </tr>
            </thead>

            {/* Table body */}
            <tbody className='text-sm text-gray-500'>
              {courses.map((course) => (
                <tr key={course._id} className='border-b border-gray-500/20'>

                  {/* Course info */}
                  <td className='md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate'>
                    {course.courseThumbnail && (
                      <img
                        src={course.courseThumbnail}
                        alt="Course Image"
                        className="w-16"
                      />
                    )}
                    <span className='truncate hidden md:block'>
                      {course.courseTitle}
                    </span>
                  </td>

                  {/* Earnings calculation */}
                  <td className='px-4 py-3'>
                    {currency} {Math.floor(
                      course.enrolledStudents.length * 
                      (course.coursePrice - course.discount * course.coursePrice / 100)
                    )}
                  </td>

                  {/* Student count */}
                  <td className='px-4 py-3'>
                    {course.enrolledStudents.length}
                  </td>

                  {/* Published date */}
                  <td className='px-4 py-3'>
                    {new Date(course.createdAt).toLocaleDateString()}
                  </td>

                  {/* Delete action */}
                  <td>
                    <button
                      onClick={() => handleDelete(course._id)}
                      className="text-sm bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  ) : <Loading />
}

// Exporting component
export default MyCourses
