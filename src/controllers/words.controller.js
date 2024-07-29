import { findWords, saveWord } from "../services/words.service.js"

export const getWords = async (req, res) =>  {
    try {
        const words = await findWords();
        res.send(words);
    } catch (error) {
        console.log(error);
    }
}

export const saveWords = async (req, res) => {
    const url = req.query
    const word = {
        _id: 'asdasdfasdfasdfsff',
        quantity: 2,
        product: 'TV'
    }

    try {
        const savedWord = await saveWord(word)
        console.log(savedWord);
        res.send({
            _id: savedWord
        })
    } catch (error) {
        console.log(error);
    }
}