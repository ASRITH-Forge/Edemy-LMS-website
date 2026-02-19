// Importing React hooks, utilities, auth, API, and helpers
import { createContext, useEffect, useState } from "react";
import { dummyCourses } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration"
import axios from "axios";
import {useAuth,useUser} from "@clerk/clerk-react"
import { toast } from "react-toastify";

// Creating global context
export const AppContext = createContext()

// Context Provider (global state + functions)
export const AppContextProvider = (props)=>{

    // Environment variables
    const backendURL = import.meta.env.VITE_BACKEND_URL
    const currency = import.meta.env.VITE_CURRENCY

    // Navigation hook
    const navigate = useNavigate()

    // Auth hooks
    const {getToken} = useAuth()
    const {user}=useUser()
    
    // Global states
    const [allCourses , setAllCourses] = useState([])
    const [isEducator , setisEducator] = useState(false)
    const [enrolledCourses , setEnrolledCourses] = useState([])
    const [userData , setUserData] = useState(null)

    // Fetch all courses
    const fetchAllCourses = async()=>{
       try {
         const {data} =  await axios.get(backendURL + "/api/course/all")

         if(data.success){
           setAllCourses(data.courses)
         }else{
           toast.error(data.message)
         }

       } catch (error) {
         toast.error(error.message)
       }
    }

    // Fetch logged-in user data
    const fetchUserData = async()=>{

       // Check if user is educator
       if(user.publicMetadata.role === 'educator'){
         setisEducator(true)
       }

      try {
        const token = await getToken()

        const {data} =  await axios.get(
          backendURL + "/api/user/data",
          {headers:{Authorization:`Bearer ${token}`}}
        ) 

        if(data.success){
         setUserData(data.user)
        }else{
         toast.error(data.message)
        }

      } catch (error) {
         toast.error(error.message)
      }
    }

    // Calculate average course rating
    const calculateRating = (course)=>{
         if(course.courseRatings.length === 0){
            return 0;
         }

         let totalRating = 0 

         course.courseRatings.forEach(rating =>{
            totalRating += rating.rating
         })

         return Math.floor(totalRating/course.courseRatings.length)
    }

    // Calculate total time of a chapter
    const calculateChapterTime = (chapter)=>{
        let time = 0
        chapter.chapterContent.map((lecture)=>time +=lecture.lectureDuration)

        return humanizeDuration(time * 60 * 1000,{units:["h","m"]})
    }

    // Calculate total course duration
    const CalculateCourseDuration = (course)=>{
        let time = 0

        course.courseContent.map((chapter)=>
          chapter.chapterContent.map((lecture)=>time+=lecture.lectureDuration)
        )

        return humanizeDuration(time * 60 * 1000,{units:["h","m"]})
    }

    // Calculate total number of lectures
    const calculateNoOfLectures = (course)=>{
       let totalLectures = 0

       course.courseContent.forEach(chapter =>{
        if(Array.isArray(chapter.chapterContent)){
            totalLectures += chapter.chapterContent.length
        }
       })

       return totalLectures;
    }

    // Fetch user's enrolled courses
    const fetchUserEnrolledCourses = async ()=>{
      try {
        const token = await getToken()

        const {data} = await axios.get(
          backendURL + "/api/user/enrolled-courses",
          {headers:{Authorization:`Bearer ${token}`}}
        )

        if(data.success){
          setEnrolledCourses(data.enrolledCourses)
        }else{
          toast.error(data.message)
        }

      } catch (error) {
         toast.error(error.message)
      }
    }

    // Initial load → fetch all courses
    useEffect(()=>{
        fetchAllCourses()
    },[])

    // When user changes → fetch user data + enrollments
    useEffect(() => {
       if(user){
         fetchUserData()
         fetchUserEnrolledCourses()
       }
    }, [user])
     
    // Values exposed to entire app
    const value={
      currency,
      allCourses,
      navigate,
      calculateRating,
      isEducator,
      setisEducator,
      calculateChapterTime,
      calculateNoOfLectures,
      CalculateCourseDuration,
      enrolledCourses,
      fetchUserEnrolledCourses,
      backendURL,
      userData,
      setUserData,
      getToken,
      fetchAllCourses
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}