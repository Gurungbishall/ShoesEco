import express from 'express';
import { showShoes,displayIndividualShoe,addShoe,searchShoes } from "../controllers/shoes.controller.js";

const router = express.Router();

router.get('/showshoes', showShoes);
router.get('/shoe',displayIndividualShoe);
router.get('/searchshoes', searchShoes);

router.post('/addshoe', addShoe);
export default router;
