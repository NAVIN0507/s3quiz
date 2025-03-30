import mongoose from "mongoose";
let isConnected = false;
export const connectToDB = async()=>{
    mongoose.set('strictQuery' , true);
    if(isConnected) return console.log("Already connected to DataBase");
    try {
        await mongoose.connect("mongodb+srv://navinofficial2005:TomCruise@cluster0.ngxz7tp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        isConnected =true;
        console.log("connected to DB")
    } catch (error) {
        console.log(error)

    }
}