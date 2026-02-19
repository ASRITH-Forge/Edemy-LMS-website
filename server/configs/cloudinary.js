// Importing Cloudinary SDK
import {v2 as cloudinary} from 'cloudinary'

// Function to configure Cloudinary connection
const connectCloudinary = async() =>{

    // Setting Cloudinary credentials from environment variables
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET_KEY
    })

}

// Exporting function
export default connectCloudinary;