import * as cheerio from 'cheerio'
import fetch from 'node-fetch'
import * as WordService from '../services/words.service.js'
import * as FileService from '../services/fileSystem.js'

const getProductDescription = async (url) => {
    try {
        // Mejor opcion que puppeteer es node-fetch  
        const response = await fetch(url)
        const html = await response.text()
        const $ = cheerio.load(html);
        const productDescription = $('#productDescription p span').text();
        return productDescription;

    } catch (error) {
        console.log(error);
    }
}

const removeNumbers = (text) => {
    return text.replace(/\b\w*\d+\w*\b/g, '')
}

const removeTrashWords = (text) => {
    const wordsToRemove = ["a", "the", "from", "for", "with", "in", "to", "and", "an", "or", "then", "any", "it", "while", "do", "might"];
    const regex = new RegExp(`\\b(${wordsToRemove.join('|')})\\b`, 'g')
    return text.replace(regex, '')
}

const removeCharacters = (text) => {
    const charsToRemove = '.,"+-/*'
    const regex = new RegExp(`[${charsToRemove}]`, 'g')
    return text.replace(regex, '')
}

const getWordsQuantity = (allWords) => {
    let wordDictionary = {}
    for (let i = 0; i < allWords.length; i++) {
        if(wordDictionary[allWords[i]]){
            wordDictionary[allWords[i]] += 1; 
        } else {
            wordDictionary[allWords[i]] = 1; 
        }
    }
    return wordDictionary
}

const getListWords = (description) => {
    let allWords = description.toLowerCase()
    //console.log(description);
    allWords = removeCharacters(allWords)
    allWords = removeTrashWords(allWords)
    allWords = removeNumbers(allWords)
    allWords = allWords.split(' ').filter( element => element.trim() !== '');
    const wordList = getWordsQuantity(allWords)

    return wordList
}

const saveNewData = async (words) => {
    try {
        for(const key in words) {
            await WordService.updateOrSaveWord({
                id: key,
                quantity: words[key], 
                product: ''
            })
        }
    } catch (error) {
        console.log(error);
    }

}

export const postWords = async (req, res) =>  {
    const { url } = req.query
    const existUrl = FileService.existUrl(url)
    if(!existUrl){
        FileService.saveUrl(url)
        try {
            // 1. Obtener la descripcion del producto
            const productDescription = await getProductDescription(url)
    
            // 2. Manejar el string para obtener unicamente las palabras, esto va a ser
            // un diccionario 
            const words = getListWords(productDescription)
    
            // 3. Guardar las palabras en la db
            //console.log(Object.keys(words).length);
            const result = await saveNewData(words)
    
            return res.status(200).send({message: 'words saved'});
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: 'Error processing URL' });
        }
    } 
    console.log(`url already used: ${url}`);
    res.status(200).send({message: 'url already used'})

}

export const getWords = async (req , res) => {
    try {
        const words = await WordService.findWords();
        res.status(200).send(words)
    } catch (error) {
        console.log(error);
    }

}