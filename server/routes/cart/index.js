const express = require("express")
const authRoute = require("./auth.route")
const userRoute = require("./user.route")
const productRoute = require("./product.route")
const cartRoute = require("./cart.route")
const router = express.Router()

router.use("/auth", authRoute)
router.use("/users", userRoute)
router.use("/products", productRoute)
router.use("/cart", cartRoute)
module.exports = router