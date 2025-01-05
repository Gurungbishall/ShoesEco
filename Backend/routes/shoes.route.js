import express from 'express';
import { showShoes } from "../controllers/shoes.controller.js";

const router = express.Router();

router.get('/showshoes', showShoes);

export default router;
