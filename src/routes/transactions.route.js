import { Router } from "express";
import { addTransaction, getFullTransactions, getTransactions } from "../controllers/transactions.controller.js";
import { addBalance } from "../controllers/balanceMaintain.controller.js";
const transactionsRouter = Router();
transactionsRouter.route("/addTransaction").post(addTransaction);
transactionsRouter.route("/:id/getTransactions").get(getTransactions);
transactionsRouter.route("/updateBalance").post(addBalance)
transactionsRouter.route("/:id/getFulltransactions").get(getFullTransactions)
export default transactionsRouter;
