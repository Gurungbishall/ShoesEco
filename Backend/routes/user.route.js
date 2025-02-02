import express from "express";
import userController from "../controllers/user.controller.js";

import { showCart } from "../controllers/ShowCustomerCart/ShowCustomerCart.js";
import { deleteCartItem } from "../controllers/DeleteCartItem/DeleteCartItem.js";
import { orderShoes } from "../controllers/OrderShoes/OrderShoes.js";
import { showPendingOrder } from "../controllers/ShowPendingOrders/ShowPendingOrders.js";
import { showCompletedOrder } from "../controllers/ShowCompletedOrders/ShowCompletedOrders.js";
import { authenticateUser } from "../middlerwares/auth.middleware.js";
import { reviewShoe } from "../controllers/ReviewingShoe/ReviewingShoe.js";
import { refreshToken } from "../model/user.model.js";

const router = express.Router();

router.post("/signin", userController.userlogin);
router.post("/signup", userController.userSignUp);
router.post("/signout", userController.userSignOut);
router.post("/refresh", refreshToken);

//protected//
router.get("/getProfile", authenticateUser, userController.getProfile);
router.post("/editprofile", authenticateUser, userController.editProfile);
router.get("/showcart", authenticateUser, showCart);
router.get("/pendingorder", authenticateUser, showPendingOrder);
router.get("/completedorder", authenticateUser, showCompletedOrder);

router.post("/review", authenticateUser, reviewShoe);
router.post("/deletecartitem", authenticateUser, deleteCartItem);
router.post("/ordershoes", authenticateUser, orderShoes);

export default router;
