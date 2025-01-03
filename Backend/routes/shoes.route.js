import express from 'express';
import { showAll } from "../controllers/shoes.controller.js";

const router = express.Router();

router.get('/allShoes', showAll);

export default router;
