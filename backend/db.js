import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const connectToMongo= async()=>{
    const mURI=process.env.MONGO_URI;
    await mongoose
      .connect(mURI)
      .then(() => console.log("Mongoose connection success"))
      .catch((err) => console.log("Error"+err));
  }


  export default connectToMongo;
