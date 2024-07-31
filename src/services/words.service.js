import { Word } from "../models/words.model.js";

export const findWords = async () => {
    const words = await Word.find({}, { products: 0 });
    return words;
};

export const updateOrSaveWord = async (word) => {
    try {
        const updateWord = await Word.findByIdAndUpdate(
            word.id,
            { $inc: { quantity: word.quantity } },
            { new: true, upsert: true }
        );

        return updateWord;
    } catch (error) {
        console.log(error);
    }
};

export const saveWord = async (word) => {
    const result = new Word(word);
    try {
        await result.save();
        return result._id;
    } catch (error) {
        console.log(error);
    }
};
