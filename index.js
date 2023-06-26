import { config } from "dotenv";
import { database } from "./model/db.js";
import { app } from "./app.js";
// import express from "express";
// import cors from "cors";
// import adminRouter from "./routes/admin/adminRoute.js";
// import userRouter from "./routes/user/userRoute.js";
// import companyRouter from "./routes/company/companyRoute.js";

config();
database();

// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cors());

// app.use("/api/v1/admin", adminRouter);
// app.use("/api/v1/users", userRouter);
// app.use("/api/v1/company", companyRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log("Server listening on port: " + PORT));
