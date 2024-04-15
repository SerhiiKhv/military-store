import mongoose from "mongoose";
import {User} from "@/app/models/User";

export async function GET(){
    await mongoose.connect(String(process.env.MONGO_URL));
    const users = await User.find()
    return Response.json(users)
}