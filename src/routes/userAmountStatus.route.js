import { Router } from "express";
import { getAllAmountStatus } from "../controllers/balanceMaintain.controller.js";
import { getSpendingEarningOverviewDetails } from "../controllers/spendingEarningOverview.controller.js";
import { getMonthlySpendingData } from "../controllers/monthlySpending.controller.js";
const recordsRouter = Router()
recordsRouter.get("/:userId/amountStatus", getAllAmountStatus)
recordsRouter.get("/singleMonthOverview", getSpendingEarningOverviewDetails)
recordsRouter.get("/:userId/monthlySpendingdetails", getMonthlySpendingData)
export default recordsRouter;