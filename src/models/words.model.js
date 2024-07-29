import mongoose from "mongoose";

const WordSchema = new mongoose.Schema({
    _id: String,
    quantity: Number,
    product: String 
    }, {
    versionKey: false
});

export const Word = mongoose.model('words', WordSchema)