import { User } from "../models/user.model.js";
import { generateToken } from "../utils/generateToken.js";

const createUser = async (req, res) => {
    try {
        // console.log(req.body);
        const { username, password, email } = req.body;
        if (!username || !password || !email) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = await User.create({ username, password, email: email.toLowerCase() });

        const token = generateToken(newUser._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 24 * 60 * 60 * 1000
        })
        return res.status(201).json({ message: "User created successfully", user: newUser });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

const loginUser = async (req, res) => {
    const { email, password, username } = req.body;
    try {
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (!existingUser) return res.status(400).json({ message: "User Not Found." })
        const isPasswordMatch = await existingUser.comparePassword(password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Invalid Credentials." })
        }

        const token = generateToken(existingUser._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            maxAge: 24 * 60 * 60 * 1000
        })
        return res.status(200).json({
            message: "Login Successful.", user: {
                username: existingUser.username, email: existingUser.email, userId: existingUser.userId
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}
const logoutUser = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        });
        return res.status(200).json({ message: "Logout successful." });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}
const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found." });
        return res.status(200).json({ user });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}
export { createUser, loginUser, logoutUser, getUserProfile };

