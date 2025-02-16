const express = require("express");
const mongoose = require("mongoose");
const config = require("./config/config");
const router = require("./routes/cart/index.js");
const jwtStrategy = require("./config/passport.js");
const passport = require("passport")
const cors = require("cors");
const app = express()
mongoose.connect(config.mongoose.url).then(()=> {
    console.log("Connected to database")
})
app.use(express.json())
app.use(cors({
    origin:["*"],
    credentials:true
}))
app.use(express.urlencoded({extended: true}))
app.use(passport.initialize())
passport.use("jwt", jwtStrategy)
app.use("/verse", router)
app.get("/", (req, res)=> {
    res.send("Hello welcome to Cart Project")
})
app.listen(config.port, ()=> {
    console.log("Server is running on port 8082")
})