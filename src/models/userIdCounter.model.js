import mongoose, { Schema } from "mongoose";
const counterSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    seq: {
        type: Number,
        default: 99999
    }
})
export const UserIdCounter = mongoose.model("UserIdCounter", counterSchema);