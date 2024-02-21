import {MenuItem} from "@/app/models/MenuItems";
import mongoose from "mongoose";

export async function POST(req: any) {
    await mongoose.connect(String(process.env.MONGO_URL));
    const {name, description, price, image, sizes, ingredients, category} = await req.json()
    const menuItemDoc = await MenuItem.create({name, description, price, image, sizes, ingredients,  category})
    return Response.json(menuItemDoc)
}

export async function PUT(req: any) {
    await mongoose.connect(String(process.env.MONGO_URL));
    const {_id, ...data} = await req.json()
    await MenuItem.findByIdAndUpdate(_id, data)
    return Response.json(true)
}

export async function GET() {
    await mongoose.connect(String(process.env.MONGO_URL));
    return Response.json(
        await MenuItem.find()
    )
}