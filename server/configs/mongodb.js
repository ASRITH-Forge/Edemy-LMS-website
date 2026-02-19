// Importing mongoose
import mongoose from "mongoose";

// Connect to MongoDB database
const  connectDB = async () => {

    // Log when DB connection is successful
    mongoose.connection.on('connected',()=>{
        console.log('Database Connected');
    })

    // Establish connection using environment URI
    await mongoose.connect(`${process.env.MONGODB_URI}/Edemy`)
}

// Exporting function
export default connectDB;