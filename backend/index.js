const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const authRouter = require("./routes/AuthRouter");
const postRouter = require("./routes/PostRouter");

require("dotenv").config();
require("./models/db");

const PORT = process.env.PORT || 8080;

// 1. Enable CORS for frontend
app.use(cors({
  origin: "http://localhost:3000", // Your React app origin
  credentials: true
}));

// 2. Allow larger payloads (for base64 images etc.)
app.use(express.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use("/auth", authRouter);
app.use("/mypost", postRouter);
app.use("/allpost", postRouter);
app.use("/delpost", postRouter);
app.use("/usersallpost", postRouter);
app.use("/alluser", authRouter);
app.use("/comment", postRouter);
app.use("/allmsg", postRouter);
app.use("/delmsg", postRouter);
app.use("/sppost", postRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
