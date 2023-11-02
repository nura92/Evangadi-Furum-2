const express = require("express");
const cors = require("cors");
const app = express();
const authMidlleware = require("./middleware/authMiddleware");
require("dotenv").config();
const port = process.env.PORT;


//express jeson midleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//dbConfig file
const DbConection = require("./db/dbConfig");

//route user midleware file
const userRouter = require("./routes/userRouter");

//routes qustion midlleware file
const questionRouter = require("./routes/questionRout");

//answer middleware files
const answerRouter = require("./routes/answerRout");


// user rout midleware
app.use("/api/user", userRouter);

// question rout midleware
app.use("/api/question", authMidlleware, questionRouter);

// answer rout midleware
app.use("/api/answer", authMidlleware, answerRouter);

//dbconecting test
const start = async () => {
  try {
    const result = await DbConection.execute("select 'test'");
    await app.listen(port);
    console.log("data base conection established");
    console.log("up runing at port", port);

    console.log(result);
  } catch (error) {
    console.log(error.message);
  }
};
start();
