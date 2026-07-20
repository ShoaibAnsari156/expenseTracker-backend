import { SpendingEarningOverview } from "../models/spendingEarningOverview.model.js"

const updateMonthlySpending = async (userId, date, category, amount) => {
    const monthIdentifier = new Date(date).toISOString().slice(0, 7)
    try {
        const updatedData = await SpendingEarningOverview.findOneAndUpdate(
            { userId, monthIdentifier },
            { $inc: { [`categories.${category}`]: amount } },
            {
                upsert: true,
                returnDocument: "after",
                setDefaultsOnInsert: true
            }
        )
        return updatedData
    } catch (error) {
        console.log("Error in Updating the Monthly spending", error);
    }
}
const getSpendingEarningOverviewDetails = async (req, res) => {
    const { userId, date } = req.query;
    try {
        const response = await SpendingEarningOverview.findOne({ userId, monthIdentifier: date })
        return res.status(200).json({ message: "SpendingEarning data fetched succesfully", data: response })
    } catch (error) {
        console.log("Error in getting overview data", error)
        return res.status(500).json({ message: "Error in getting overview data", error: error })
    }
}
export { updateMonthlySpending, getSpendingEarningOverviewDetails }
