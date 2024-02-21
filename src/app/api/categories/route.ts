import {Category} from "@/app/models/Category";
import mongoose from "mongoose";

export async function POST(req: any) {
    await mongoose.connect(String(process.env.MONGO_URL));
    const {name} = await req.json()
    const categoryDoc = await Category.create({name})
    return Response.json(categoryDoc)
}

export async function PUT(req: any) {
    await mongoose.connect(String(process.env.MONGO_URL));
    const {_id, name} = await req.json()
    await Category.updateOne({_id}, {name})
    return Response.json(true)
}

export async function GET() {
    await mongoose.connect(String(process.env.MONGO_URL));
    return Response.json(
        await Category.find()
    )
}

export async function DELETE(req: any) {
    await mongoose.connect(String(process.env.MONGO_URL));
    const url = new URL(req.url)
    const _id = url.searchParams.get('_id')
    await Category.deleteOne({_id})
    return Response.json(true)
}