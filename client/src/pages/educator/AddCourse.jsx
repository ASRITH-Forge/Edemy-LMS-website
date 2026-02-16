import React, { useRef, useState,useEffect, useContext} from 'react'
import uniqid from 'uniqid' // for unique IDs
import Quill from 'quill' // rich text editor
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const AddCourse = () => {
  const  {backendURL,getToken} = useContext(AppContext) // backend + auth
  const quillRef = useRef(null) // store quill instance
  const editorRef = useRef(null) // editor DOM ref

  const [courseTitle, setCourseTitle] = useState('')
  const [coursePrice, setCoursePrice] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [image, setImage] = useState(null)
  const [chapters, setChapters] = useState([]) // chapters + lectures
  const [showPopUp, setShowPopUp] = useState(false) // popup toggle
  const [currentChapterId, setCurrentChapterId] = useState(null)

  const [lectureDetails, setLectureDetails] = useState({
      lectureTitle: '',
      lectureDuration: '',
      lectureUrl: '',
      isPreviewFree: false,
  })

  const handleChapter = (action,chapterId) =>{
    if(action ==='add'){
      const title = prompt('Enter Chapter Name:')
      if(title){
        const newChapter = {
          chapterId : uniqid(),
          chapterTitle:title,
          chapterContent:[], // lectures array
          collapsed : false,
          chapterOrder:chapters.length > 0 ? chapters.slice(-1)[0].chapterOrder + 1:1,
        }
        setChapters([...chapters,newChapter]) // add chapter
      }
    }else if(action === 'remove'){
      setChapters(chapters.filter((chapter)=> chapter.chapterId !==chapterId)) // delete
    }else if(action === 'toggle'){
        setChapters(chapters.map((chapter)=> 
          chapter.chapterId === chapterId ? {...chapter,collapsed:!chapter.collapsed}:chapter))
    }
  }

  const handleLecture = (action,chapterId,lectureIndex) =>{
    if(action === 'add'){ 
      setCurrentChapterId(chapterId) // select chapter
      setShowPopUp(true) // open popup
    }else if(action === 'remove'){
        setChapters(chapters.map((chapter)=>{
          if(chapter.chapterId === chapterId){
            chapter.chapterContent.splice(lectureIndex,1) // remove lecture
          }
          return chapter; 
    }));
    }
  }

  const addLecture = ()=>{  
    setChapters(chapters.map((chapter)=>{
      if(chapter.chapterId === currentChapterId){
        const newLecture = {
          ...lectureDetails,
          lectureOrder:chapter.chapterContent.length > 0 ? chapter.chapterContent.slice(-1)[0].lectureOrder + 1:1,
          lectureId : uniqid()
        }
        chapter.chapterContent.push(newLecture) // add lecture
      }
      return chapter
    }))
     setShowPopUp(false) // close popup
     setLectureDetails({ // reset inputs
      lectureTitle:'',
      lectureDuration:'',
      lectureUrl:'',
      isPreviewFree:false,
     })
}

const handleSubmit = async(e)=>{
  try {
  e.preventDefault()
    if(!image){
      toast.error("Thumbnail Not Selected") // validation
    }
    const courseData = {
      courseTitle,
      courseDescription:quillRef.current.root.innerHTML, // get editor content
      coursePrice:Number(coursePrice),
      discount:Number(discount),
      courseContent:chapters,
    }
    const formData = new FormData()
    formData.append('courseData',JSON.stringify(courseData)) // send JSON
    formData.append('thumbnail',image) // send image

    const token = await getToken()
    const {data} = await axios.post(
      backendURL+'/api/educator/add-course',
      formData,
      {headers:{Authorization:`Bearer ${token}`}}
    )

  if(data.success){
    toast.success(data.message)
    setCourseTitle('')
    setCoursePrice(0)
    setDiscount(0)
    setImage(null)
    setChapters([])
    quillRef.current.root.innerHTML='' // clear editor
  }else{
    toast.error(data.message)
  }
  } catch (error) {
    toast.error(error.message)  
  }
}

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow', // initialize editor
      });
    }
  }, [])

  return (
    <div className='h-screen overflow-scroll flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0'>
      <form onSubmit={handleSubmit} action="" className='flex flex-col gap-4 max-w-md w-full text-gray-500'>
        
        {/* Course Title */}
        <div className='flex flex-col gap-1'>
          <p>Course Title</p>
          <input onChange={e => setCourseTitle(e.target.value)} value={courseTitle} type="text" placeholder='Type here' className='outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500' required />
        </div>

        {/* Description Editor */}
        <div className='flex flex-col gap-1'>
          <p>Course Description</p>
          <div ref={editorRef}></div>
        </div>
         
        {/* Price + Thumbnail */}
        <div className='flex items-center justify-between flex-wrap'>
          <div className='flex flex-col gap-1'>
            <p>Course Price</p>
            <input onChange={e=>setCoursePrice(e.target.value)} value={coursePrice} type="number" placeholder='0' className='outline-none md:py-2.5 w-28 py-2 px-3 rounded border border-gray-500' />
          </div>
        
          <div className='flex md:flex-row flex-col items-center gap-3'>
            <p>Course Thumbnail</p>
            <label htmlFor="thumbnailImage" className='flex items-center gap-3'>
              <img src={assets.file_upload_icon} alt="" className='p-3 bg-blue-500 rounded'/>
              <input type="file" id='thumbnailImage' onChange={e=>setImage(e.target.files[0])} accept="image/*" hidden/>
              <img className='max-h-10' src={image ? URL.createObjectURL(image):''} alt="" />
            </label>
          </div>
        </div>

        {/* Discount */}
        <div className='flex flex-col gap-1'>
          <p>Discount %</p>
          <input onChange={ e=>setDiscount(e.target.value)} value={discount} type="number" placeholder='0' min={0} max={100} className='outline-none md:py-2.5 w-28 px-3 rounded border border-gray-500' required/>
        </div>

        {/* Chapters + Lectures */}
        <div>
          {chapters.map((chapter,chapterIndex)=>(
            <div key={chapterIndex} className='bg-white border rounded-lg mb-4'>
              
              {/* Chapter Header */}
              <div className='flex justify-between items-center p-4 border-b'>
                <div className='flex items-center'>
                  <img onClick={()=>handleChapter('toggle',chapter.chapterId)} src={assets.dropdown_icon} width={14} alt="" className={`mr-2 cursor-pointer transition-all ${chapter.collapsed && "-rotate-90"}`}/>
                  <span className='font-semibold'> {chapterIndex + 1} {chapter.chapterTitle} </span>
                </div>
                <span className='text-gray-500'>{chapter.chapterContent.length} Lectures</span>
                <img onClick={()=>handleChapter('remove',chapter.chapterId)} src={assets.cross_icon} alt="" className='cursor-pointer'/>
              </div>

              {/* Lectures */}
              {!chapter.collapsed && (
                <div className='p-4'>
                  {chapter.chapterContent.map((lecture,lectureIndex)=>(
                    <div key={lectureIndex} className='flex justify-between items-center mb-2'>
                      <span>
                        {lectureIndex+1} {lecture.lectureTitle} - {lecture.lectureDuration} mins - 
                        <a href={lecture.lectureUrl} target='_blank' className='text-blue-500'> Link</a> - 
                        {lecture.isPreviewFree ? 'Free Preview':'Paid'}
                      </span>
                      <img onClick={()=>handleLecture('remove',chapter.chapterId,lectureIndex)} src={assets.cross_icon} alt="" className='cursor-pointer'/>
                    </div>
                  ))}
                  <div onClick={()=>handleLecture('add',chapter.chapterId)} className='inline-flex bg-gray-100 p-2 rounded cursor-pointer mt-2'>
                    + Add Lecture
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Add Chapter */}
          <div className='flex justify-center items-center bg-blue-100 p-2 rounded-lg cursor-pointer' onClick={()=> handleChapter('add')}>
            + Add Chapter
          </div>

          {/* Popup */}
          {showPopUp && (
            <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50'>
              <div className='bg-white text-gray-700 p-4 rounded relative w-full max-w-80'>
                
                <h2 className='text-lg font-semibold mb-4'>Add Lecture</h2>

                <input type="text" placeholder='Title' value={lectureDetails.lectureTitle}
                  onChange={(e)=>setLectureDetails({...lectureDetails,lectureTitle:e.target.value})}/>

                <input type="number" placeholder='Duration'
                  value={lectureDetails.lectureDuration}
                  onChange={(e)=>setLectureDetails({...lectureDetails,lectureDuration:e.target.value})}/>

                <input type="text" placeholder='URL'
                  value={lectureDetails.lectureUrl}
                  onChange={(e)=>setLectureDetails({...lectureDetails,lectureUrl:e.target.value})}/>

                <input type="checkbox"
                  checked={lectureDetails.isPreviewFree}
                  onChange={(e)=>setLectureDetails({...lectureDetails,isPreviewFree:e.target.checked})}/>

                <button onClick={addLecture} type='button'>Add</button>
                <img onClick={()=>setShowPopUp(false)} src={assets.cross_icon} alt="" />
              </div>
            </div>
          )}
        </div>

        <button type='submit'>Add</button>
      </form>
    </div>
  )
}

export default AddCourse
