import mongoose from "mongoose";
const recentTransactionsSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: true,
        unique: true
    },
    transactions: {
        type: [{
            date: {
                type: String,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            category: {
                type: String,
                required: true
            },
            amount: {
                type: Number,
                required: true
            }
        }],
        required: true
    }
});
export const RecentTransactions = mongoose.model("RecentTransactions", recentTransactionsSchema);