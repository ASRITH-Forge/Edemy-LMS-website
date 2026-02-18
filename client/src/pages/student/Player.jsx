// Importing hooks, context, utilities, components, and APIs
import React, { useContext, useState,useEffect, use } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'
import humanizeDuration from 'humanize-duration'
import { useParams } from 'react-router-dom'
import YouTube from  'react-youtube'
import Footer from '../../components/student/Footer'
import Rating from '../../components/student/Rating'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loading from '../../components/student/Loading'

// Player component (course player + progress + rating)
const Player = () => {

  // Context values
  const {enrolledCourses, calculateChapterTime,backendUrl,getToken,userData,fetchUserEnrolledCourses} = useContext(AppContext)

  // Get courseId from URL
  const {courseId}= useParams()
  
  // State management
  const [courseData,setCourseData] = useState(null)
  const [openSections,setOpenSections] = useState({})
  const [playerData,setPlayerData] = useState(null)
  const [progressData,setProgressData] = useState(null)
  const [initialRating,setInitialRating] = useState(0)

  // Get selected course from enrolled courses
  const getCourseData = ()=>{
    enrolledCourses.map((course)=>{
      if(course._id === courseId){
        setCourseData(course)

        // Get user's existing rating
        course.courseRatings.map((rating)=>{
        if(item.userId === userData._id){
          setInitialRating(item.rating)
        }
      })
    }
    })
  }

  // Toggle chapter open/close
  const toggleSection = (index) => {
    setOpenSections((prev) => ({
        ...prev,
        [index]: !prev[index]
    }))
  } 
  
  // Load course data when enrolledCourses updates
  useEffect(() => {
    if(enrolledCourses.length > 0){
      getCourseData()
    }
  }, [enrolledCourses])

  // Mark lecture as completed
  const markLectureAsCompleted = async(lectureId)=>{
    try {
      const token = await getToken()

      const {data}  = await axios.post(
        backendUrl+'/api/user/update-course-progress',
        {courseId,lectureId},
        {headers:{Authorization:`Bearer ${token}`}}
      )

      if(data.success){
        toast.success(data.message)
        getCourseProgress()
      }else{
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  // Fetch course progress
  const getCourseProgress = async()=>{
    try {
      const token = await getToken()

      const {data} = await axios.post(
        backendUrl+'/api/user/get-course-progress',
        {courseId},
        {headers:{Authorization:`Bearer ${token}`}}
      )

      if(data.success){
        setProgressData(data.progressData)
      }else{
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  // Handle course rating
  const handleRate=async(rating)=>{
    try {
      const token = await getToken()

      const {data} = await axios.post(
        backendUrl+'/api/user/add-rating',
        {courseId,rating},
        {headers:{Authorization:`Bearer ${token}`}}
      )

      if(data.success){
        toast.success(data.message)
        fetchUserEnrolledCourses()
      }else{
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }
  
  // Load progress on mount
  useEffect(()=>{ 
    getCourseProgress()
  },[])

  return courseData? (
    <>
    <div className='p-4 sm:p-10 flex flex-col-reverse md:grid md:grid-cols-2 gap-10 md:px-36'>

     {/* Left section (course structure) */}
      <div className='text-gray-800'>

         <h2 className='text-xl font-semibold'>Course Structure</h2>

         {/* Chapters + lectures */}
         <div className='pt-5'>
           {courseData && courseData.courseContent.map((chapter, index) => (
             <div key={index}>

               {/* Chapter toggle */}
               <div onClick={() => toggleSection(index)}>
                 {chapter.chapterTitle}
               </div>

               {/* Lectures list */}
               {openSections[index] && (
                 <ul>
                   {chapter.chapterContent.map((lecture, i) => (
                     <li key={i}>

                       {/* Lecture title */}
                       {lecture.lectureTitle}

                       {/* Play video */}
                       {lecture.lectureUrl && (
                         <span
                           onClick={()=>setPlayerData({
                             ...lecture,
                             chapter : index + 1,
                             lecture : i+1
                           })}
                         >
                           Watched
                         </span>
                       )}
                     </li>
                   ))}
                 </ul>
               )}
             </div>
           ))}
         </div>

        {/* Rating */}
        <div className='flex items-center gap-2 py-3 mt-10'>
          <h1 className='text-xl font-bold'>Rate this Course :</h1>
          <Rating initialRating={initialRating} onRate={handleRate}/>
        </div>
      </div>
      
     {/* Right section (video player) */}
       <div className='md:mt-10'>

        {playerData ? (
          <div>

            {/* YouTube player */}
            <YouTube 
              videoId={playerData.lectureUrl.split('/').pop()}  
              iframeClassName='w-full aspect-video'
            />

            {/* Lecture info + progress button */}
            <div className='flex justify-between items-center mt-1'>
              <p>
                {playerData.chapter}.{playerData.lecture}.{playerData.lectureTitle}
              </p>

              <button 
                onClick={()=>markLectureAsCompleted(playerData.lectureId)} 
                className='text-blue-600'
              >
                {
                  progressData && 
                  progressData.lectureCompleted.includes(playerData.lectureId) 
                  ? 'Completed' 
                  : 'Mark Complete'
                }
              </button>
            </div>

          </div>
        ) : <img src={courseData ? courseData.courseThumbnail : ''} alt="" />}
       </div>

    </div>

    {/* Footer */}
    <Footer/>
  </>
  ):<Loading/>
}

// Exporting component
export default Player