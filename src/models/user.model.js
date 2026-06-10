import mongoose, { Schema } from "mongoose";
import { UserIdCounter } from "./UserIdCounter.model.js";
import bcrypt from "bcrypt";
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 20
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    userId: {
        type: Number,
        unique: true
    }
}, { timestamps: true }
);
userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.pre("save", async function () {
    const doc = this;
    if (!doc.isNew) {
        return;
    }
    try {
        const count = await UserIdCounter.findOneAndUpdate(
            {
                _id: "userId"
            },
            [
                {
                    $set: {
                        seq: {
                            $add: [
                                { $ifNull: ["$seq", 999999] },
                                1
                            ]
                        }
                    }
                }
            ],
            {
                upsert: true,
                returnDocument: "after",
                updatePipeline: true
            }
        );
        // console.log("Generated userId:", count);
        doc.userId = count.seq;
    }
    catch (error) {
        console.log("Error generating userId:", error);
    }
});
export const User = mongoose.model("User", userSchema);