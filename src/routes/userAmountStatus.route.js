import { Router } from "express";
import { getAllAmountStatus } from "../controllers/balanceMaintain.controller.js";
import { getSpendingEarningOverviewDetails } from "../controllers/spendingEarningOverview.controller.js";
const recordsRouter = Router()
recordsRouter.get("/amountStatus/:userId", getAllAmountStatus)
recordsRouter.get("/singleMonthOverview", getSpendingEarningOverviewDetails)
export default recordsRouter;