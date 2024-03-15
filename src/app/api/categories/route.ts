import {CategoriesMilitaryStore} from "@/app/models/Category";
import mongoose from "mongoose";

export async function POST(req: any) {
    await mongoose.connect(String(process.env.MONGO_URL));
    const {name} = await req.json()
    const categoryDoc = await CategoriesMilitaryStore.create({name})
    return Response.json(categoryDoc)
}

export async function PUT(req: any) {
    await mongoose.connect(String(process.env.MONGO_URL));
    const {_id, name} = await req.json()
    await CategoriesMilitaryStore.updateOne({_id}, {name})
    return Response.json(true)
}

export async function GET(req: any) {
    await mongoose.connect(String(process.env.MONGO_URL));
    const url = new URL(req.url);
    const categoryId = url.searchParams.get('id');

    if (categoryId) {
        const category = await CategoriesMilitaryStore.findById(categoryId);
        return Response.json(category);
    } else {
        const categories = await CategoriesMilitaryStore.find();
        return Response.json(categories);
    }
}

export async function DELETE(req: any) {
    await mongoose.connect(String(process.env.MONGO_URL));
    const url = new URL(req.url)
    const _id = url.searchParams.get('_id')
    await CategoriesMilitaryStore.deleteOne({_id})
    return Response.json(true)
}