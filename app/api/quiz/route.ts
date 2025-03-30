import { connectToDB } from "@/lib/mongoose"

export async function GET(){
    connectToDB();
    return Response.json({
        success:true,
        data:'Health Api'
    })
}
