import mongoose from "mongoose";
let isConnected = false;
export const connectToDB = async()=>{
    mongoose.set('strictQuery' , true);
    if(isConnected) return console.log("Already connected to DataBase");
    try {
        await mongoose.connect(process.env.MONGODB_URI!)
        isConnected =true;
        console.log("connected to DB")
    } catch (error) {
        console.log(error)

    }
}