import express from "express";
import { Verify } from "../middlerwares/auth.middleware";
import { DeleteUser } from "../controllers/admin.controller";

const router = express.Router();


router.delete("/deleteuser/:customer_id", Verify, DeleteUser);

export default router;