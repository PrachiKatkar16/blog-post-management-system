const express=require('express')
const postRoutes=require('./routes/postRoute')
const cors = require('cors');

const app=express()

app.use(express.json())
app.use(
  cors({
    origin: [
      "https://blog-post-manager.vercel.app",
    ],
  })
);

app.use("/api/posts", postRoutes);

module.exports=app