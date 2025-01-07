import express from "express";
import userController from "../controllers/user.controller.js";

const router = express.Router();

router.get("/getProfile", userController.getProfile);
router.post("/signin", userController.userlogin);
router.post("/signup", userController.userSignUp);
router.post("/editprofile", userController.editProfile);
router.get("/showcart", userController.showCart);

export default router;
