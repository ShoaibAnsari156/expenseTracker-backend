import mongoose from "mongoose";
const balances = new mongoose.Schema({
    userId: {
        type: Number,
        required: true,
        unique: true
    },
    totalBalance: {
        type: Number,
        required: true
    },
    totalIncome: {
        type: Number,
        required: true
    },
    totalExpense: {
        type: Number,
        required: true
    },
    currentMonth: {
        type: String, // e.g. "2026-07"
        default: () => new Date().toISOString().slice(0, 7)
    }
})
export const Balances = mongoose.model("Balances", balances);