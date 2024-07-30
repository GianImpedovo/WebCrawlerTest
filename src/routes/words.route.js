import { Router } from "express";
import { getWords, saveWords } from "../controllers/words.controller.js";

const wordsRouter = Router();

wordsRouter.post("/", saveWords)
wordsRouter.get("/words", getWords)


export default wordsRouter