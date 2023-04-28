import { model, Schema, models } from "mongoose";

const ProductSchema = new Schema({
    title: {type:String, required: true},
    description: {type:String},
    price: {type:Number, required: true},
    productImages: [{type:String}],
});

export const Product = models.Products || model('Products', ProductSchema);