const express = require("express");
const cookiesParser = require("cookie-parser");
const cors = require("cors");

const app = express()

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.json())
app.use(cookiesParser())

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const productRoutes = require("./routes/productRoutes");
app.use("/api/products", productRoutes);

app.get("/",(req,res)=>{
    res.send("API is running...")
})

module.exports = app