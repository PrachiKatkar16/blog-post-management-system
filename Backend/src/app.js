const express = require("express");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: [
      "https://blog-post-management-system-m1le.vercel.app",
      "https://blog-post-management-system-git-9f96df-prachi-katkars-projects.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

app.use(express.json());

// routes
app.use("/api/posts", require("./routes/postRoute"));

module.exports = app;