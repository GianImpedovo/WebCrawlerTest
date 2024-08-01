import mongoose from "mongoose";

const UrlSchema = new mongoose.Schema({
    _id: String,
    }, {
    versionKey: false
});

export const Url = mongoose.model('urls', UrlSchema)