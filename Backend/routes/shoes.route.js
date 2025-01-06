import express from 'express';
import { showShoes,displayIndividualShoe } from "../controllers/shoes.controller.js";

const router = express.Router();

router.get('/showshoes', showShoes);
router.get('/shoe',displayIndividualShoe);

export default router;
