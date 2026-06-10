import { Router } from "express";
import { addTransaction, getTransactions } from "../controllers/transactions.controller.js";
import { addBalance } from "../controllers/balanceMaintain.controller.js";
const transactionsRouter = Router();
transactionsRouter.route("/addTransaction").post(addTransaction);
transactionsRouter.route("/getTransactions/:id").get(getTransactions);
transactionsRouter.route("/updateBalance").post(addBalance)
export default transactionsRouter;
