const express = require("express");
const app = express();
const mongoose = require("mongoose");
const mainRouter = require("./routes/index");
const cors = require("cors")
const dotenv = require("dotenv")
dotenv.config();
app.use(cors());
app.use(express.json()); 


app.use("/api/v1", mainRouter);

async function connectDB() {
    const mongoUrl = process.env.MONGO_URI;
    const port = process.env.PORT;

    if(!mongoUrl){
        throw new Error("Couldn't find mongo db url");
    }
    await mongoose.connect(mongoUrl);
    app.listen(port, ()=> {
        console.log("Connected to DB, Server is now listening to port " + port)
    })
}
connectDB();