import express from 'express';
import cors from 'cors';
import wordsRouter from './src/routes/words.route.js';
import dotenv from 'dotenv';
import { dbconecction } from './src/db/connection.js';
dotenv.config()

const app = express();
app.use(cors())
app.use(express.json())
app.use(wordsRouter)

const PORT = parseInt(process.env.PORT)

dbconecction()

app.listen(8080, () => {
    console.log(`Iniciando el servidor: http://localhost:${PORT}`);
})