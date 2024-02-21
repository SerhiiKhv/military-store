import mongoose, { model, models, Schema } from "mongoose";

const ExtraPriceSchema = new Schema({
    name: String,
    price: Number
})

const MenuItemsSchema = new Schema({
    name: { type: String },
    description: { type: String },
    price: { type: Number },
    image: { type: String },
    sizes: {type:[ExtraPriceSchema]},
    ingredients: {type:[ExtraPriceSchema]},
    category: {type: mongoose.Types.ObjectId}
}, { timestamps: true });

export const MenuItem = models?.MenuItem || model('MenuItem', MenuItemsSchema);
