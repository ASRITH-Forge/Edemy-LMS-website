// Importing hooks, routing, context, utilities, and libraries
import React, { useContext } from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import Loading from '../../components/student/Loading'
import { assets } from '../../assets/assets'
import humanizeDuration from 'humanize-duration'
import Footer from '../../components/student/Footer'
import YouTube from 'react-youtube'
import axios from 'axios'
import { toast } from 'react-toastify'

// CourseDetails component (course info + enrollment + preview)
const CourseDetails = () => {

  // Get course id from URL
  const { id } = useParams()

  // State management
  const [courseData, setCourseData] = useState(null)
  const [openSections, setOpenSections] = useState({})
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false)
  const [playerData, setPlayerData] = useState(null)

  // Context values (helpers + API + user)
  const { allCourses, calculateRating, calculateChapterTime, calculateNoOfLectures, CalculateCourseDuration, currency,backendURL,userData,getToken, navigate} = useContext(AppContext)

  // Fetch course details
  const fetchCourseData = async() => {
    try {
      const {data} = await axios.get(backendURL+'/api/course/'+id)
      if(data.success){
        setCourseData(data.courseData)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  // Handle course enrollment (Razorpay integration)
  const enrollCourse = async () => {
    try {
      if (!userData) return toast.warn("Login to enroll");

      const token = await getToken();

      const { data } = await axios.post(
        backendURL + "/api/user/purchase",
        { courseId: courseData._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!data.success) {
        return toast.error(data.message);
      }

      const options = {
        key: data.razorpayKey,
        amount: data.order.amount,
        currency: "INR",
        name: "Edemy LMS",
        description: courseData.courseTitle,
        order_id: data.order.id,

        // Payment success handler
        handler: async function (response) {
          await axios.post(
            backendURL + "/api/user/verify-payment",
            {
              ...response,
              purchaseId: data.purchaseId,
            },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          toast.success("Enrollment successful");
          navigate("/my-enrollments");
        },

        prefill: {
          name: data.user.name,
          email: data.user.email,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      toast.error(error.message);
    }
  };

  // Fetch course on mount
  useEffect(() => {
    fetchCourseData()
  }, [])

  // Check if user already enrolled
  useEffect(() => {
    if(userData && courseData){
      setIsAlreadyEnrolled(userData.enrolledCourses.includes(courseData._id))
    }
  }, [userData,courseData])

  // Toggle chapter expand/collapse
  const toggleSection = (index) => {
    setOpenSections((prev) => ({
        ...prev,
        [index]: !prev[index]
    }))
  }

  return courseData ? (
    <>
      <div className='flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:pt-30 pt-20 text-left '>

        {/* Left section (course info) */}
        <div className='max-w-xl z-10 text-gray-500'>

          {/* Title + description */}
          <h1 className='md:text-course-details-heading-large text-course-details-heading-small font-semibold text-gray-800'>
            {courseData.courseTitle}
          </h1>

          {/* Rating + students */}
          <div className='flex items-center space-x-2 pt-3 pb-1 text-sm'>
            <p>{calculateRating(courseData)}</p>

            {/* Star rating */}
            <div className='flex'>
              {[...Array(5)].map((_, i) => (
                <img 
                  className='w-3.5 h-3.5' 
                  src={i < Math.floor(calculateRating(courseData)) ? assets.star : assets.star_blank} 
                  key={i} 
                  alt='' 
                />
              ))}
            </div>
          </div>

          {/* Course structure (chapters + lectures) */}
          <div className='pt-8 text-gray-800'>
            <h2 className='text-xl font-semibold'>Course Structure</h2>

            {courseData.courseContent.map((chapter, index) => (
              <div key={index}>

                {/* Chapter toggle */}
                <div onClick={() => toggleSection(index)}>
                  {chapter.chapterTitle}
                </div>

                {/* Lecture list */}
                {openSections[index] && (
                  <ul>
                    {chapter.chapterContent.map((lecture, i) => (
                      <li key={i}>
                        {lecture.lectureTitle}

                        {/* Preview video */}
                        {lecture.isPreviewFree && (
                          <span onClick={()=>setPlayerData({
                            videoId : lecture.lectureUrl.split('/').pop()
                          })}>
                            Preview
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right section (video + pricing + enroll) */}
        <div>

          {/* Video preview */}
          {
            playerData 
            ? <YouTube videoId={playerData.videoId} opts={{playerVars:{autoplay:1}}}/>
            : <img src={courseData.courseThumbnail} alt="" />
          }

          {/* Price + enroll */}
          <button onClick={enrollCourse}>
            {isAlreadyEnrolled ? 'Already Enrolled' : 'Enroll Now'}
          </button>

        </div>
      </div>

      {/* Footer */}
      <Footer/>
    </>
  ) : <Loading />
}

// Export
export default CourseDetails