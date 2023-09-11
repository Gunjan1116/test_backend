
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoute = require('./routes/userRoute');
const authRoute = require("./routes/authRoute");
const likedPostsRoute = require("./routes/likedPostsRoute")
const commentRoute = require("./routes/commentRoute")
const {connection}=require("./config/db")
require('dotenv').config();

const app = express();
// Enable CORS middleware
app.use(cors());

app.use(express.json());

 




app.get("/",(req,res)=>{
  res.send("Welcome to Basic Home API");
})

// Include routes
app.use('/registration', userRoute);
app.use("/auth", authRoute);
app.use("/like", likedPostsRoute);
app.use("/comment", commentRoute);

app.listen(process.env.PORT, async () => {
  try {
      await connection;
      console.log("Connected to DB");
      console.log(`Server is running at port ${process.env.PORT}`)
  } catch (error) {
      console.log("Not able to connect to DB");
      console.log(error);
  }
})
