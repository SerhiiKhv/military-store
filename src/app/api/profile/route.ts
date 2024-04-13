import mongoose from "mongoose";
//import {getServerSession} from "next-auth";
//import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {User} from "@/app/models/User";

export async function PUT(req: any) {
    await mongoose.connect(String(process.env.MONGO_URL));
    const data = await req.json();
    const {_id} = data

    let filter = {}

    if(_id){
        filter = {_id}
    }else{
        /*const session = await getServerSession(authOptions)
        const email = session?.user?.email
        filter = {email}*/
    }

    await User.updateOne(filter, data)

    return Response.json(data)
}

export async function GET(req: any) {
    await mongoose.connect(String(process.env.MONGO_URL));
    //const session = await getServerSession(authOptions);

    const url = new URL(req.url)
    const _id = url.searchParams.get('_id')

    let filter = {}

    if(_id){
        filter = {_id}
    }else{
        /*if (session) {
            const email = session.user?.email;
            if (email) {
                filter = {email}
            } else {
                return Response.json({error: "Email not found in session"}, {status: 400});
            }
        } else {
            return Response.json({error: "Session not found"}, {status: 400});
        }*/
    }

    const user = await User.findOne(filter);
    return Response.json(user);
}
