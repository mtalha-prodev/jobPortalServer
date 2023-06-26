import express from "express";
import cors from "cors";
import adminRouter from "./routes/admin/adminRoute.js";
import userRouter from "./routes/user/userRoute.js";
import companyRouter from "./routes/company/companyRoute.js";
import cookieParser from "cookie-parser"

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/company", companyRouter);