// Importing hooks, context, API, loader, and utilities
import React, { useContext, useEffect,useState} from 'react'
import { dummyStudentEnrolled } from '../../assets/assets'
import Loading from '../../components/student/Loading'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

// StudentsEnrolled component (shows enrolled students list)
const StudentsEnrolled = () => {

  // Getting backend and auth utilities
  const {backendURL,isEducator,getToken} = useContext(AppContext)

  // State to store enrolled students
  const [enrolledStudents, setEnrolledStudents] = useState(null)

  // Fetch enrolled students data
  const fetchEnrolledStudents = async ()=>{
    try {
      const token = await getToken()

      const {data} = await axios.get(
        backendURL + '/api/educator/enrolled-students',
        {headers:{Authorization:`Bearer ${token}`}}
      )

      if(data.success){
        // Reverse to show latest first
        setEnrolledStudents(data.enrolledStudents.reverse())
      }else{
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message) 
    }
  }

  // Fetch data when educator is available
  useEffect(() => {
    if(isEducator){
      fetchEnrolledStudents()
    }
  }, [isEducator])
 
  return enrolledStudents ? (
    <div className='min-h-screen flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0'>

      {/* Students table */}
      <div className='flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20'>

        <table className='md:table-auto table-fixed w-full overflow-hidden pb-4'>

          {/* Table header */}
          <thead className='text-gray-900 border-b border-gray-500/20 text-sm text-left'>
             <tr>
              <th className='px-4 py-3 font-semibold text-center hidden sm:table-cell'>#</th>
              <th className='px-4 py-3 font-semibold'>Student Name</th>
              <th className='px-4 py-3 font-semibold'>Course Title</th>
              <th className='px-4 py-3 font-semibold hidden sm:table-cell'>Date</th>
             </tr>
          </thead>

          {/* Table body */}
          <tbody>
            {enrolledStudents.map((item,index)=>(

              <tr key={index} className='border-b border-gray-500/20'>

                {/* Index */}
                <td className='px-4 py-2 text-center hidden sm:table-cell'>
                  {index + 1}
                </td>

                {/* Student info */}
                <td className='md:px-4 px-2 py-3 flex items-center space-x-3'>
                  <img 
                    src={item.student.imageUrl} 
                    alt=""  
                    className='w-9 h-9 rounded-full'
                  />
                  <span className='truncate'>
                    {item.student.name}
                  </span>
                </td>

                {/* Course title */}
                <td className='px-4 py-3 truncate'>
                  {item.courseTitle}
                </td>

                {/* Purchase date */}
                <td className='px-4 py-3 hidden sm:table-cell'>
                  {new Date(item.purchaseDate).toLocaleDateString()}
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  ) : <Loading/>
}

// Exporting component
export default StudentsEnrolled
