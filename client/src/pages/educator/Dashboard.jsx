// Importing React hooks, context, assets, API, and utilities
import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets, dummyDashboardData } from '../../assets/assets'
import Loading from '../../components/student/Loading'
import axios from 'axios'
import { toast } from 'react-toastify'

// Dashboard component (educator analytics page)
const Dashboard = () => {

  // Getting values from global context
  const { currency, backendURL, isEducator, getToken } = useContext(AppContext)

  // State to store dashboard data
  const [dashboardData, setDashboardData] = useState(null)

  // Fetch dashboard data from backend
  const fetchDashboardData = async () => {
    try {
      const token = await getToken()

      const { data } = await axios.get(
        backendURL + '/api/educator/dashboard',
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (data.success) {
        setDashboardData(data.dashboardData)
      } else {
        console.log(data);
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  // Debug log (optional)
  console.log(dashboardData);

  // Fetch data when educator logs in
  useEffect(() => {
    if (isEducator) {
      fetchDashboardData()
    }
  }, [isEducator])

  return dashboardData ? (
    <div className='min-h-screen flex flex-col items-start justify-between gap-8 md:p-8 md:pb-0 p-4 pt-8 pb-0'>

      <div className='space-y-5'>

        {/* Top stats cards */}
        <div className='flex flex-wrap gap-5 items-center'>

          {/* Total Enrollments */}
          <div className='flex items-center gap-3 shadow-card border border-blue-500 p-4 w-56 rounded-md'>
            <img src={assets.patients_icon} alt="patients_icon" />
            <div>
              <p className='text-2xl font-medium text-gray-600'>
                {dashboardData.enrolledStudentsData.length}
              </p>
              <p className='text-base text-gray-500'>Total Enrolments</p>
            </div>
          </div>

          {/* Total Courses */}
          <div className='flex items-center gap-3 shadow-card border border-blue-500 p-4 w-56 rounded-md'>
            <img src={assets.appointments_icon} alt="patients_icon" />
            <div>
              <p className='text-2xl font-medium text-gray-600'>
                {dashboardData.totalCourses}
              </p>
              <p className='text-base text-gray-500'>Total Courses</p>
            </div>
          </div>

          {/* Total Earnings */}
          <div className='flex items-center gap-3 shadow-card border border-blue-500 p-4 w-56 rounded-md'>
            <img src={assets.earning_icon} alt="patients_icon" />
            <div>
              <p className='text-2xl font-medium text-gray-600'>
                {currency}{dashboardData.totalEarnings}
              </p>
              <p className='text-base text-gray-500'>Total Earnings</p>
            </div>
          </div>
        </div>

        {/* Latest enrollments table */}
        <div>
          <h2 className='pb-4 text-lg font-medium'>Latest Enrollments</h2>

          <div className='flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20'>

            <table className='table-fixed md:table-auto w-full overflow-hidden'>

              {/* Table header */}
              <thead className='text-gray-900 border-b border-gray-500/20 text-sm text-left'>
                <tr>
                  <th className='px-4 py-3 font-semibold text-center hidden sm:table-cell'>#</th>
                  <th className='px-4 py-3 font-semibold'>Student Name</th>
                  <th className='px-4 py-3 font-semibold'>Course Title</th>
                </tr>
              </thead>

              {/* Table body */}
              <tbody className='text-sm text-gray-500'>
                {dashboardData.enrolledStudentsData
                  ?.filter(item => item && item.name) // Safety check
                  .map((item, index) => (
                    <tr key={index} className='border-b border-gray-500/20'>

                      {/* Index */}
                      <td className='px-4 py-3 text-center hidden sm:table-cell'>
                        {index + 1}
                      </td>

                      {/* Student info */}
                      <td className='md:px-4 px-2 py-3 flex items-center space-x-3'>
                        <img
                          src={item.imageUrl || assets.profile_placeholder}
                          alt="Profile"
                          className='w-9 h-9 rounded-full'
                        />
                        <span className='truncate'>{item.name}</span>
                      </td>

                      {/* Course title */}
                      <td className='px-4 py-3 truncate'>
                        {item.courseTitle}
                      </td>
                    </tr>
                  ))}
              </tbody>

            </table>
          </div>
        </div>
      </div>
    </div>
  ) : <Loading />
}

// Exporting component
export default Dashboard
