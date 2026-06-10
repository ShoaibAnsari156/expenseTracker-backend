import express from "express"
const app = express();
import userRouter from "./routes/user.route.js";
import cors from "cors";
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
import cookieParser from "cookie-parser";
import transactionsRouter from "./routes/transactions.route.js";
import recordsRouter from "./routes/userAmountStatus.route.js";
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/user", userRouter)
app.use("/api/v1/transactions", transactionsRouter)
app.use("/api/v1/records", recordsRouter)

export default app;