import mongoose, { model, models, Schema } from "mongoose";

const OrderSchema = new Schema({
    userId: { type: mongoose.Types.ObjectId, default: null },
    shopItems: [{ type: Schema.Types.ObjectId, ref: 'ShopItemMilitaryStore' }],
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
    status: { type: Boolean}
}, { timestamps: true });

export const Order = models?.Order || model("Order", OrderSchema);
