import express from "express"
import userRouter from "./routes/user.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import transactionsRouter from "./routes/transactions.route.js";
import recordsRouter from "./routes/userAmountStatus.route.js";
import { authMiddleware } from "./utils/authMiddleware.js";
import connectDB from "./config/database.js";
const app = express();
// Middleware to ensure DB is connected before processing requests
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (err) {
        res.status(500).json({ error: "Database connection failed" });
    }
});
// app.use(cors({
//     origin: "http://localhost:5173",
//     credentials: true,
// }));
const allowedOrigins = [
    "http://localhost:5173",
    process.env.CLIENT_URL // Set this in Vercel environment variables!
].filter(Boolean);
app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('CORS not allowed by server'));
        }
    },
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/user", userRouter)
app.use(authMiddleware)
app.use("/api/v1/transactions", transactionsRouter)
app.use("/api/v1/records", recordsRouter)

export default app;