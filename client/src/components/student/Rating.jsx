// Importing React hooks
import React, { useEffect, useState } from 'react'

// Rating component (interactive star rating)
const Rating = ({initialRating ,onRate}) => {

  // State to manage current rating value
  const [rating,setRating] = useState(initialRating || 0)

  // Handle user click on a star
  const handleRating = (value) =>{
    setRating(value);

    // Trigger callback if provided (send selected rating to parent)
    if(onRate) onRate(value)
  }

  // Update rating when initialRating prop changes
  useEffect(()=>{
     if(initialRating){
      setRating(initialRating)
     }
  },[initialRating])

  return (
    <div>

     {/* Render 5 stars dynamically */}
     {Array.from({length:5},(_,index)=>{
       const starValue = index+1

       return (
        <span 
          key={index} 
          // Highlight stars based on current rating
          className={`text-xl sm:text-2xl cursor-pointer transition-colors ${
            starValue <= rating ? 'text-yellow-500':'text-gray-400'
          }`}
          onClick={()=>handleRating(starValue)}
        > 
          &#9733;
        </span>
       )
     })}
    </div>
  )
}

// Exporting component
export default Rating
