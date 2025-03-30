"use server"
import axios from "axios";

export const fetchData = async()=>{
   try {
    const user = await axios.get("https://s3quiz.vercel.app/api/quiz")
    
    return user.data
   } catch (error) {
    console.log(error)
   }
}