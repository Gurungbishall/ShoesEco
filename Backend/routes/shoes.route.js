import express from 'express';
import { showShoes } from "../controllers/DisplayShoesByBrand/DisplayShoesByBrand.js";
import { displayIndividualShoe } from '../controllers/IndividualShoe/IndividualShoe.controller.js';
import { searchShoes } from '../controllers/SearchShoe/SearchShoe.controller.js';
import { addShoe } from '../controllers/AddingShoeInCart/AddingShoeInCart.js';
import { listOfReviewOfShoe } from "../controllers/ListOFReviewOfShoe/ListOfReviewOfShoe.js";


const router = express.Router();

router.get('/showshoes', showShoes);
router.get('/shoe',displayIndividualShoe);
router.get('/searchshoes', searchShoes);
router.get("/review-list", listOfReviewOfShoe);

router.post('/addshoe', addShoe);
export default router;
