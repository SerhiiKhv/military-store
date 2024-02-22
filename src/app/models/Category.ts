import {model, models, Schema} from "mongoose";

const CategorySchema = new Schema({
      name: {type: String, required: true},
}, {timestamps: true})

export const CategoriesMilitaryStore = models?.CategoriesMilitaryStore || model('CategoriesMilitaryStore', CategorySchema)