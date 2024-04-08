import mongoose, { model, models, Schema } from "mongoose";

export const ShopItemsSchema = new Schema({
    name: { type: String },
    description: { type: String },
    price: { type: Number },
    image: { type: [String] },
    category: {type: mongoose.Types.ObjectId},
    availability: {type: Boolean},
    cod: {type: Number},
    rating: [{
        userId: {type: mongoose.Types.ObjectId},
        rate: {type: Number}
    }]
}, { timestamps: true });

export const ShopItemMilitaryStore = models?.ShopItemMilitaryStore || model('ShopItemMilitaryStore', ShopItemsSchema);
