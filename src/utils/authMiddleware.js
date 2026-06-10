import jwt from "jsonwebtoken";
export const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    // console.log("Received token:", token);
    if (!token) return res.status(401).json({ message: "Unauthorized" })
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        // console.log("Authenticated user:", decoded);
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "Unauthorized", error: error.message });
    }

}