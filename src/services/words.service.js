import { Router } from "express";
import { saveWords } from "../controllers/words.controller.js";

const wordsRouter = Router();

wordsRouter.get("/words", saveWords)


export default wordsRouter