import dotenv from 'dotenv';
// import connectDB from './config/database.js';
import app from './app.js';
dotenv.config({ path: "./.env" });

// const startServer = async () => {
//     try {
//         await connectDB();
//         app.on("error", (error) => {
//             console.error("Server error:", error);
//             throw error;
//         });
//         app.listen(process.env.PORT, () => {
//             console.log(`Server is running on port ${process.env.PORT}`);
//         })
//     }
//     catch (error) {
//         console.error("Error starting server:", error);
//     }
// }
// startServer();

if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
export default app;