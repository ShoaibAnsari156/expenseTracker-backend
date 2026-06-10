import mongoose from "mongoose";
const spendingEarningOverview = new mongoose.Schema({
    userId: {
        type: Number,
        required: true,
        index: true
    },
    monthIdentifier: {
        type: String,
        required: true,
        index: true
    },
    categories: {
        type: Map,
        of: Number,
        default: {}
    }
});
export const SpendingEarningOverview = mongoose.model("SpendingEarningOverview", spendingEarningOverview);