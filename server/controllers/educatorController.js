import { clerkClient } from '@clerk/express'
import { v2 as cloudinary } from 'cloudinary'
import Course from '../models/Course.js'
import Purchase from '../models/Purchase.js'
import User from '../models/User.js'



//update role ton educator

export const updateRoleToEducator = async (req, res) => {
    try {
        const userId = req.auth().userId

        await clerkClient.users.updateUserMetadata(userId, {
            publicMetadata: {
                role: 'educator'
            }
        })
        res.json({ success: true, message: 'You can publish a course now' })
    } catch (error) {
        res.json({ success: false, message: error.message })

    }
}


// Add New Course

export const addCourse = async (req, res) => {

    try {
        const { courseData } = req.body
        const imageFile = req.file
        const educatorId = req.auth().userId


        if (!imageFile) {
            return res.json({ success: false, message: 'Thumbnail Not Attached' })
        }
        const parsedCourseData = await JSON.parse(courseData)
        parsedCourseData.educator = educatorId
        const newCourse = await Course.create(parsedCourseData)

        const imageUpload = await cloudinary.uploader.upload(imageFile.path)

        newCourse.courseThumbnail = imageUpload.secure_url


        await newCourse.save()

        res.json({ success: true, message: 'Course Added Successfully' })

    } catch (error) {
        res.json({ success: false, message: error.message })

    }
}

//Get Educator Courses

export const getEducatorCourses = async (req, res) => {
    try {
        const educator = req.auth().userId
        const courses = await Course.find({ educator })
        res.json({ success: true, courses })
    } catch (error) {
        res.json({ success: false, message: error.message })


    }
}

//Get Educator Dashboard Data (Total Earning ,Enrolled Students,No of Courses)

export const educatorDashboardData = async (req, res) => {
    try {
        const educator = req.auth().userId;
        const courses = await Course.find({ educator })
        const totalCourses = courses.length

        const courseIds = courses.map(course => course._id);
        //Calculate total earnings from purchases
        const purchases = await Purchase.find({
            courseId: { $in: courseIds },
            status: 'completed'
        });

        const totalEarnings = purchases.reduce((sum, purchase) => sum + purchase.amount, 0)

        //Collect unique enrolled student ID's with their course titles
        const enrolledStudentsData = []
        for (const course of courses) {
            const students = await User.find({ _id: { $in: course.enrolledStudents } }, 'name imageUrl')
            students.forEach(student => {
                enrolledStudentsData.push({
                    courseTitle: course.courseTitle,
                    name: student.name,
                    imageUrl: student.imageUrl
                })
            })

        }
        res.json({
            success: true, dashboardData: {
                totalCourses,
                totalEarnings,
                enrolledStudentsData
            }, message: 'Dashboard Data Fetched Successfully'
        })
    }
    catch (error) {

        res.json({ success: false, message: error.message })
    }
}

//Get enrolled students Data with Purchased data

export const getEnrolledStudentsData = async (req, res) => {
    try {
        const educator = req.auth().userId
        const courses = await Course.find({ educator })
        const courseIds = courses.map(course => course._id)

        const purchases = await Purchase.find({ courseId: { $in: courseIds }, status: 'completed' }).populate('userId', 'name imageUrl').populate('courseId', 'courseTitle')

        const enrolledStudents = purchases.map(purchase => {
            return {
                student: purchase.userId,
                courseTitle: purchase.courseId.courseTitle,
                purchaseDate: purchase.createdAt
            }
        })

        res.json({ success: true, enrolledStudents })
    } catch (error) {
        res.json({ success: false, message: error.message })

    }

}

// deleting the course
export const deleteCourse = async (req, res) => {
  try {
    const educatorId = req.auth().userId
    const { courseId } = req.params

    const course = await Course.findOne({
      _id: courseId,
      educator: educatorId
    })

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found or unauthorized"
      })
    }

    await Course.findByIdAndDelete(courseId)

    res.json({
      success: true,
      message: "Course deleted successfully"
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

