import mongoose from "mongoose";

const WordSchema = new mongoose.Schema({
    _id: String,
    quantity: Number,
    products: [String]
})

export const Word = mongoose.model('cloudWords', WordSchema)