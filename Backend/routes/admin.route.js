import express from "express";
import { DeleteUser } from "../controllers/admin.controller";

const router = express.Router();


router.delete("/deleteuser/:customer_id", DeleteUser);

export default router;