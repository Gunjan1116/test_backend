require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoute = require('./routes/userRoute');
const postRoute = require('./routes/postRoute'); 
const authRoute = require("./routes/authRoute");
const likedPostsRoute = require("./routes/likedPostsRoute")
const commentRoute = require("./routes/commentRoute")
const profileRoute = require("./routes/profileRoute")
const {connection}=require("./config/db")

const app = express();
app.use(express.json());
const PORT = 8082;
 
// Enable CORS middleware
app.use(cors());


// Serve static images from the 'uploads' directory
app.use("/uploads", express.static("uploads"));

// mongoose connection
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   connectTimeoutMS: 30000, // Set a higher timeout value
// });
app.get("/",(req,res)=>{
  res.send("Welcome to Basic Home API");
})

// Include routes
app.use('/registration', userRoute);
app.use('/post', postRoute); 
app.use("/auth", authRoute);
app.use("/like", likedPostsRoute);
app.use("/comment", commentRoute);
app.use("/profile", profileRoute);

app.listen(PORT, async () => {
  try {
      await connection;
      console.log("Connected to DB");
      console.log(`Server is running at port ${PORT}`)
  } catch (error) {
      console.log("Not able to connect to DB");
      console.log(error);
  }
})
