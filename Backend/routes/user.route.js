import express from "express";
import userController from "../controllers/user.controller.js";

const router = express.Router();

router.get("/getProfile", userController.getProfile);
router.get("/showcart", userController.showCart);

router.post("/signin", userController.userlogin);
router.post("/signup", userController.userSignUp);
router.post("/editprofile", userController.editProfile);
router.post("/deletecartitem", userController.deleteCartItem);

export default router;
