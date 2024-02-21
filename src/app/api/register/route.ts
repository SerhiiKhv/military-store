import mongoose from "mongoose";
import {User} from "@/app/models/User";

export async function POST(req: any) {
    try {
        const body = await req.json();
        await mongoose.connect(String(process.env.MONGO_URL));
        const createdUser = await User.create(body);

        if (createdUser) {
            return Response.json(createdUser);
        } else {
            return Response.json({ error: "Failed to create user" }, { status: 500 });
        }
    } catch (error: any) {
        return Response.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
