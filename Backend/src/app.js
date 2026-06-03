const express=require('express')
const postRoutes=require('./routes/postRoute')
const cors = require('cors');

const app=express()

app.use(express.json())
app.use(
  cors({
    origin: [
      "https://blog-post-management-system-git-9f96df-prachi-katkars-projects.vercel.app/",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api/posts", postRoutes);

module.exports=app