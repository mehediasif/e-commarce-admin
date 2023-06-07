import mongoose, { model, Schema, models } from "mongoose";

const OrderSchema = new Schema({
    line_items: Object,
    name: {type:String, required: true},
    email: {type:String, required: true},
    city: {type:String, required: true},
    postalCode: {type:String, required: true},
    firstAddressLine: {type:String, required: true},
    secondAddressLine: {type:String, required: true},
    country: {type:String, required: true},
    paid: {type:Boolean},
} ,{
    timestamps: true,
});

export const Order = models?.Order || model('Order', OrderSchema);