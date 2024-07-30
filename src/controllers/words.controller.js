import { findWords, saveWord } from "../services/words.service.js"
import puppeteer from 'puppeteer'

const getProductDescription = async (url) => {
    try {
        // Usando pupeteer ----------
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2' });
        
        const description = await page.$eval('#productDescription p span', element => element.innerText); //, element => element.innerText
        await browser.close();

        return description

    } catch (error) {
        console.log(error);
    }
}


const getHTML = async (url) => {

}



export const getWords = async (req, res) =>  {
    const { url } = req.query
    try {
        //const words = await findWords();
        const html = await getProductDescription('http://www.amazon.com/gp/product/B00VVOCSOU')
        
        res.send(html);
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