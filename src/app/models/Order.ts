import mongoose, { model, models, Schema } from "mongoose";
import {ShopItemsSchema} from "@/app/models/ShopItem";

const generateOrderNumber = () => {
    let orderNumber = '';
    for (let i = 0; i < 9; i++) {
        orderNumber += Math.floor(Math.random() * 10); // Додаємо випадкову цифру від 0 до 9
    }
    return orderNumber;
};

const OrderSchema = new Schema({
    userId: { type: mongoose.Types.ObjectId, default: null },
    shopItems: [{ type: ShopItemsSchema }],
    contactInformation: {
        name: { type: String},
        email: { type: String},
        phone: { type: String},
    },
    delivery: {
        deliveryMethod: { type: String},
        dateDelivery: { type: String},
        departmentNumber: { type: String },
        firstName: { type: String},
        surName: { type: String},
        patronymic: { type: String},
        address: { type: String },
        time: { type: String },
    },
    payment: {type: String},
    status: { type: Boolean},
    orderNumber: {
        type: String,
        default: generateOrderNumber
    },
    price: {type: Number}
}, { timestamps: true });

export const Order = models?.Order || model("Order", OrderSchema);
