import express from "express";
import cors from "cors";
import userController from "../controllers/user.controller.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/getProfile", userController.getProfile);
app.post("/signin", userController.userlogin);
app.post("/signup", userController.userSignUp);
app.post("/editprofile", userController.editProfile);

app.listen(3000, () => {
  console.log("Server has started on port 3000");
});
