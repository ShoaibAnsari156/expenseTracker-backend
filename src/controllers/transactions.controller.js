import { RecentTransactions } from "../models/recentTransactions.model.js";
import { balanceMaintain } from "./balanceMaintain.controller.js";
import { updateMonthlySpending } from "./spendingEarningOverview.controller.js";

const addTransaction = async (req, res) => {
    try {
        const { userId, date, title, category, amount } = req.body;

        if (!userId || !date || !title || !category || !amount) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const transaction = await RecentTransactions.findOneAndUpdate(
            { userId },
            {
                $push: {
                    transactions: {
                        date,
                        title,
                        category,
                        amount
                    }
                }
            },
            {
                new: true,
                upsert: true
            }
        );
        if (transaction.transactions) {

        }

        // console.log("transactions", transaction);
        await balanceMaintain(userId, amount, category)
        const monthlyTransactionsOverview = await updateMonthlySpending(userId, date, category, amount)
        return res.status(200).json({
            message: "Transaction saved successfully",
            data: {
                transaction,
                monthlyTransactionsOverview
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
};
const getTransactions = async (req, res) => {
    try {
        const { userId } = req.params.id;
        const allTransactions = await RecentTransactions.findOne(userId)
        // console.log(allTransactions);

        if (allTransactions) {
            return res.status(200).json({ message: "All Transactions Get Successfully", data: allTransactions })
        }
        else {
            return res.status(404).json({ message: "No Transactions Data Present at this moment" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error", error: error })
    }
}
export { addTransaction, getTransactions };