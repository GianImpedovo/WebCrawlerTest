import mongoose from "mongoose";
import paginate from 'mongoose-paginate-v2'

const WordSchema = new mongoose.Schema({
    _id: String,
    quantity: Number,
    product: String 
    }, {
    versionKey: false
});

WordSchema.plugin(paginate)

export const Word = mongoose.model('words', WordSchema)