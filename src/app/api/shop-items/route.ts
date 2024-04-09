import {ShopItemMilitaryStore} from "@/app/models/ShopItem";
import mongoose from "mongoose";
import {CharacteristicsType} from "@/components/Types/ShopItem";

export async function POST(req: any) {
    await mongoose.connect(String(process.env.MONGO_URL));
    const {name, description, price, image, category, availability, cod, characteristics} = await req.json()
    const menuItemDoc = await ShopItemMilitaryStore.create({name, description, price, image, category, availability, cod, characteristics})
    return Response.json(menuItemDoc)
}

export async function PUT(req: any) {
    await mongoose.connect(String(process.env.MONGO_URL));
    const {_id, ...data} = await req.json()
    await ShopItemMilitaryStore.findByIdAndUpdate(_id, data)
    return Response.json(true)
}

export async function GET() {
    await mongoose.connect(String(process.env.MONGO_URL));
    return Response.json(
        await ShopItemMilitaryStore.find()
    )
}