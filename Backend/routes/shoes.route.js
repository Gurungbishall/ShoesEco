import express from 'express';
import { showShoes,displayIndividualShoe,addShoe } from "../controllers/shoes.controller.js";

const router = express.Router();

router.get('/showshoes', showShoes);
router.get('/shoe',displayIndividualShoe);
router.post('/addshoe', addShoe);

export default router;
