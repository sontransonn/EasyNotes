import express from "express"
import cookieParser from "cookie-parser";

import "./configs/dotenv.config.js"
import corsConfig from "./configs/cors.config.js"

import authRoute from "./routes/auth.route.js"
import userRoute from "./routes/user.route.js"
import postRoute from "./routes/post.route.js"
import commentRoute from "./routes/comment.route.js"

import dbService from "./services/db.service.js";

const app = express()

const PORT = process.env.PORT || 8080;

app.use(corsConfig)
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRoute)
app.use("/api/v1/user", userRoute)
app.use("/api/v1/post", postRoute)
app.use("/api/v1/comment", commentRoute)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

app.listen(PORT, () => {
    dbService.connectDB()
    console.log(`Server is running on port ${PORT}`)
});