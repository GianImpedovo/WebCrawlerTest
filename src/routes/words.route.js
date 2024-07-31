import { Router } from "express";
import { getWords, postWords } from "../controllers/words.controller.js";

const wordsRouter = Router();

wordsRouter.post("/", postWords)
wordsRouter.get("/words", getWords)


export default wordsRouter