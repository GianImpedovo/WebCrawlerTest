import express from 'express';
import cors from 'cors';
import wordsRouter from './src/services/words.service.js';
import dotenv from 'dotenv';
dotenv.config()

const app = express();

app.use(cors())
app.use(express.json())
app.use(wordsRouter)

const PORT = parseInt(process.env.PORT)

app.listen(8080, () => {
    console.log(`Iniciando el servidor: http://localhost:${PORT}`);
})