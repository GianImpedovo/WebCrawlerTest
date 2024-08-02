import * as cheerio from 'cheerio'
import { parentPort } from 'worker_threads'
import fetch from 'node-fetch'

parentPort.on('message', async (url) => {
    try {

        // 1. Obrain the description from the product
        const productDescription = await getProductDescription(url)

        // 2. Manage string to obtain only the words that matter
        // using dictionary/jsn
        const words = getListWords(productDescription)

        parentPort.postMessage({ words: words });
    } catch (error) {
        parentPort.postMessage({ status: 'error', url, error });
    }
})

const getProductDescription = async (url) => {
    try {
        // Best option: try puppeteer, axios, cheerio ...
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
    const wordsToRemove = ["a", "the", "from", "for", "with", 
                            "in", "to", "and", "an", "or", "then", "any", "it", 
                            "while", "do", "might", "is", "that", "been", "are", 
                            "of", "its", "as", "can", "well", "this", "but"];
    const regex = new RegExp(`\\b(${wordsToRemove.join('|')})\\b`, 'g')
    return text.replace(regex, '')
}

const removeCharacters = (text) => {
    const charsToRemove = '”.,"+-/*`(){}=#$&!:;%x'
    const regex = new RegExp(`[${charsToRemove}]`, 'g')
    return text.replace(regex, '')
}

const getWordsQuantity = (allWords) => {
    let wordDictionary = {}
    for (let i = 0; i < allWords.length; i++) {
        if (wordDictionary[allWords[i]]) {
            wordDictionary[allWords[i]] += 1;
        } else {
            wordDictionary[allWords[i]] = 1;
        }
    }
    return wordDictionary
}

const getListWords = (description) => {
    let allWords = description.toLowerCase()
    
    // Cleaning the word
    allWords = removeCharacters(allWords)
    allWords = removeTrashWords(allWords)
    allWords = removeNumbers(allWords)
    allWords = allWords.split(' ').filter(element => element.trim() !== '');
    const wordList = getWordsQuantity(allWords)

    return wordList
}