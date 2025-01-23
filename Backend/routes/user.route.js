import express from "express";
import userController from "../controllers/user.controller.js";
import { Verify } from "../middlerwares/auth.middleware.js";
const router = express.Router();

router.get("/getProfile", userController.getProfile);
router.get("/showcart", userController.showCart);
router.get("/pendingorder", userController.showPendingOrder);
router.get("/completedorder", userController.showCompletedOrder);



router.post("/signin", userController.userlogin);
router.post("/signup", userController.userSignUp);
router.post("/signout", Verify, userController.userSignOut);
router.post("/editprofile", userController.editProfile);
router.post("/deletecartitem", userController.deleteCartItem);
router.post("/ordershoes",userController.orderShoes);

export default router;
