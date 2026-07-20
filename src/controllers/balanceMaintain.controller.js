import { Balances } from "../models/balances.model.js"

// const balanceMaintain = async (userId, amount, type) => {
//     try {
//         const adjustment = type === "Income" ? amount : -amount;
//         const updatedQuery = { $inc: { totalBalance: adjustment } }
//         if (type === "Income") { updatedQuery.$inc.totalIncome = amount } else { updatedQuery.$inc.totalExpense = amount }
//         const updatedvalue = await Balances.findOneAndUpdate({ userId }, updatedQuery, { new: true, upsert: true })
//         // console.log("BalanceMaintain updatedvalue", updatedvalue);
//     } catch (error) {
//         console.log("BalanceMaintain Error", error);
//     }
// }

const balanceMaintain = async (userId, amount, type) => {
    try {
        const currentMonth = new Date().toISOString().slice(0, 7); // "2026-07"
        console.log("typeof:", typeof(amount))
        let balance = await Balances.findOne({ userId });

        if (!balance) {
            balance = await Balances.create({
                userId,
                totalBalance: 0,
                totalIncome: 0,
                totalExpense: 0,
                currentMonth
            });
        }

        // Reset monthly income & expense if month has changed
        if (balance.currentMonth !== currentMonth) {
            balance.totalIncome = 0;
            balance.totalExpense = 0;
            balance.currentMonth = currentMonth;
        }

        // Update values
        if (type === "Income") {
            balance.totalBalance += amount;
            balance.totalIncome += amount;
        } else {
            balance.totalBalance -= amount;
            balance.totalExpense += amount;
        }

        await balance.save();

    } catch (error) {
        console.log("BalanceMaintain Error:", error);
    }
};

const addBalance = async (req, res) => {
    const { userId, totalBalance } = req.body
    try {
        if (!userId || totalBalance === undefined) {
            return res.status(400).json({ message: "User ID and Total Balance are required" })
        }
        const updatedData = await Balances.findOneAndUpdate(
            { userId: userId },
            {
                totalBalance: totalBalance,
                $setOnInsert: { totalIncome: 0, totalExpense: 0 } // Only sets these if creating a new document
            },
            { new: true, upsert: true }
        );
        // console.log("updatedData", updatedData);

        return res.status(201).json({ message: "Balance Updated Sucessfully", data: updatedData })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error", error: error })
    }
}
const getAllAmountStatus = async (req, res) => {
    try {
        const userId = req.params.userId;
        // console.log("userId", userId)
        // if (!userId) return res.status(404).json({ message: "userId is required" })
        const response = await Balances.findOne({ userId })
        if (response) {
            return res.status(200).json({ message: "All Amounts gets successfully", data: response })
        }
        else {
            return res.status(404).json({ message: "No Amounts Found for this User" })
        }

    } catch (error) {
        console.log("Error while getting amount status", error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}
export { balanceMaintain, addBalance, getAllAmountStatus }