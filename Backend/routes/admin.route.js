import express from "express";
import { AdminVerify } from "../middlerwares/auth.middleware";
import { DeleteUser } from "../controllers/admin.controller";

const router = express.Router();


router.delete("/deleteuser/:customer_id", AdminVerify, DeleteUser);

export default router;