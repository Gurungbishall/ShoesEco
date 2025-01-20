import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.route.js";
import shoesRoutes from "./routes/shoes.route.js";
import adminRoutes from "./routes/shoes.route.js";
import { refreshToken } from "./model/user.model.js";
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/user", userRoutes);  
app.use("/shoes", shoesRoutes);  
app.use("/admin", adminRoutes);

app.post("/api/refresh",refreshToken );

app.listen(3000, () => {
  console.log("Server has started on port 3000");
});
  