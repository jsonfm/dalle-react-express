import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./mongodb/connect.js";
import postRouter from "./routers/post.js";
import dalleRouter from "./routers/dalle.js";


dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json({ limit: '50mb'}));

// Routers
app.use("/api/v1/post", postRouter);
app.use("/api/v1/dalle", dalleRouter);

//
app.get("/", async (req, res) => {
    res.send("hello world!");
});


const startServer = async () => {

    try{
        connectDB(process.env.MONGODB_URL)
        app.listen(8080, () => console.log("server is running on http://0.0.0.0:8080"))
    }catch(err){
        console.log(err);
    }
}

startServer();