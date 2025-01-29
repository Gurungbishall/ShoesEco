import express from "express";
import userController from "../controllers/user.controller.js";
import { authenticateUser } from "../middlerwares/auth.middleware.js";
const router = express.Router();

router.post("/signin", userController.userlogin);
router.post("/signup", userController.userSignUp);
router.post("/signout", userController.userSignOut);


//protected//
router.get("/showcart",authenticateUser, userController.showCart);
router.get("/pendingorder",authenticateUser, userController.showPendingOrder);
router.get("/completedorder",authenticateUser, userController.showCompletedOrder);
router.get("/getProfile", authenticateUser, userController.getProfile);
router.post("/editprofile", authenticateUser, userController.editProfile);
router.post("/deletecartitem",authenticateUser , userController.deleteCartItem);
router.post("/ordershoes",userController.orderShoes);

export default router;
