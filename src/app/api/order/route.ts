import mongoose from "mongoose";
import {Order} from "@/app/models/Order";

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