import { findWords, saveWord } from "../services/words.service.js"
import puppeteer from 'puppeteer'
import axios from 'axios'
import * as cheerio from 'cheerio'
import fetch from 'node-fetch'
import JSDOM from 'jsdom'

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
    const charsToRemove = '.,"'
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

export const getWords = async (req, res) =>  {
    const { url } = req.query
    try {
        // VERIFICAR QUE LA URL NO SE HAYA USADO PREVIAMENTE

        // 1. Obtener la descripcion del producto
        // const productDescription = await getProductDescription('http://www.amazon.com/gp/product/B00VVOCSOU')

        // 2. Manejar el string para obtener unicamente las palabras, esto va a ser
        // un diccionario 
        const string = 'enjoy the creative life with the tcl 40" 1080p direct led hdtv. it delivers premium picture quality and tremendous value in a sophisticated slim frame design perfect for bringing entertainment to any space. this flat screen led hdtv features high definition 1080p resolution for a sharper image and tcl true color technology for brilliant color and contrast. with direct led backlighting, view darker blacks and luminous brightness while maintaining the best standards in energy efficiency.'
        const palabras = getListWords(string)

        // 3. Guardar las palabras en la db
        console.log(palabras);

        res.send(string);
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
        // const savedWord = await saveWord(word)
        // console.log(savedWord);
        // res.send({
        //     _id: savedWord
        // })
    } catch (error) {
        console.log(error);
    }
}