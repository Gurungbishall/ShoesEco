import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.route.js";
import shoesRoutes from "./routes/shoes.route.js";
import adminRoutes from "./routes/shoes.route.js";
const app = express();
const port = process.env.DB_PORT;

const allowedOrigins = "https://shoes-eco.vercel.app";
const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/user", userRoutes);
app.use("/shoes", shoesRoutes);
app.use("/admin", adminRoutes);

app.listen(port, () => {
  console.log("Server has started on port 3000");
});
