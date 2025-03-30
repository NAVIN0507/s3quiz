import { connectToDB } from "@/lib/mongoose"
import Quiz from "@/lib/models/quiz.model"; 
export async function GET(){
    connectToDB();
    const quiz = await Quiz.find();
    return Response.json({
        success:true,
        data:quiz
    })
}

export async function POST(request:Request){
    connectToDB();
 try {
    const quizzes = await request.json();

    if (!Array.isArray(quizzes) || quizzes.length === 0) {
      return new Response(JSON.stringify({ error: "Invalid input. Expected an array of quizzes." }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    

    const insertedQuizzes = await Quiz.insertMany(quizzes);

    return new Response(JSON.stringify({ message: "Quizzes inserted successfully", data: insertedQuizzes }), {
      status: 201,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error : any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}