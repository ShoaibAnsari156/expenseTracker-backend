import { response } from "express";
import { SpendingEarningOverview } from "../models/spendingEarningOverview.model.js"

const getMonthlySpendingData = async (req, res) => {
    try {
        const userId = req.params.userId
        const response = await SpendingEarningOverview.find({ userId }).sort({monthIdentifier:1})
        // console.log("getMonthlySpendingData", response);
        const lineGraphData = response.map((data) => {
            let total = 0;
            for (const [category, value] of data.categories) {
                if (category != "Income") {
                    total += value
                }
            }
            return {
                month: data.monthIdentifier,
                total: total
            }
        })
        // console.log(lineGraphData);
        return res.status(200).json({ message: "month wise data get successfully", data: lineGraphData })

    } catch (error) {
        console.log("Error in getting the monthly spending data", error);
        return res.status(500).json({ message: "Error in getting the monthly spending data", error: error })
    }
}
export { getMonthlySpendingData }