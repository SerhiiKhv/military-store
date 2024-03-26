import mongoose from "mongoose";
import {Order} from "@/app/models/Order";

export async function POST(req: any) {
    await mongoose.connect(String(process.env.MONGO_URL));

    const {userId, shopItems, contactInformation, delivery, payment} = await req.json()
    const orderDoc = await Order.create({
        userId,
        shopItems,
        contactInformation,
        delivery,
        payment,
        status: false
    });

    return Response.json(orderDoc);
}