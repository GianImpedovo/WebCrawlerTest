import fs from 'fs'
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = join(__dirname, 'urlsUsed.txt');
let urlsUsed = new Set();

export const saveUrl = (url) => {
    try {
        urlsUsed.add(url);
        fs.appendFileSync(filePath, `${url}\n`, 'utf8')
    } catch (error) {
        console.log(error);
    }
}

export const loadUrls = () => {
    try {
        if(fs.existsSync(filePath)){
            let data = fs.readFileSync(filePath, 'utf8');
            data = data.split('\n')
            urlsUsed = new Set(data)
        } 
    } catch (err) {
        console.error('Error loading visited URLs:', err);
    }
}

export const existUrl = (url) => {
    return urlsUsed.has(url)
}
