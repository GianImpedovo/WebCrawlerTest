import * as WordService from '../services/words.service.js'
import * as UrlService from '../services/url.service.js'
import {  join } from 'path';
import { Worker } from 'worker_threads';

const workerPath = join(import.meta.dirname, 'word.worker.js');
let activeWorkers = 0;
const maxWorkers = 3;

const initializeWorker = (url) => {
    return new Promise((res, rej) => {
        const worker = new Worker(workerPath);

        worker.on('message', (message) => {
            res(message);
            activeWorkers--;
        });

        worker.on('error', (error) => {
            rej(error);
            activeWorkers--;
        });

        worker.postMessage(url);
        activeWorkers++;
    });
}

export const postWords = async (req, res) => {
    const { url } = req.query
    const existUrl = await UrlService.existUrl(url)
    if (!existUrl) {
        UrlService.saveUrl(url)
        if (activeWorkers < maxWorkers) {
            try {
                const result = await initializeWorker(url);
                await saveNewData(result.words);
                return res.status(200).send({ message: 'Success url processing' });
            } catch (error) {
                return res.status(500).send({ message: 'Error url processing', error });
            }
        } else {
            return res.send({ message: 'Try later' });
        }
    }

    res.status(200).send({ message: 'url already used' })

}

const saveNewData = async (words) => {
    try {
        for (const key in words) {
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

export const getWords = async (req, res) => {
    try {
        let words = await WordService.findWords();
        words.docs.sort((a, b) => b.quantity - a.quantity)
        res.status(200).send(words)
    } catch (error) {
        console.log(error);
    }

}