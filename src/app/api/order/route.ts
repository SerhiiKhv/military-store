import mongoose from "mongoose";
import {Order} from "@/app/models/Order";
import {CategoriesMilitaryStore} from "@/app/models/Category";

export async function POST(req: any) {
    await mongoose.connect(String(process.env.MONGO_URL));

    const {userId, shopItems, contactInformation, delivery, payment, price} = await req.json()
    const orderDoc = await Order.create({
        userId,
        shopItems,
        contactInformation,
        delivery,
        payment,
        price,
        status: false
    });

    return Response.json(orderDoc);
}

export async function GET() {
    await mongoose.connect(String(process.env.MONGO_URL));
    return Response.json(
        await Order.find()
    )
}

export async function DELETE(req: any) {
    await mongoose.connect(String(process.env.MONGO_URL));
    const url = new URL(req.url)
    const _id = url.searchParams.get('_id')
    await Order.deleteOne({_id})
    return Response.json(true)
}