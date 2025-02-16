const express = require("express");
const auth = require("../../middlewares/auth");
const { cartController } = require("../../controllers");
const router = express.Router();

router.get("/", auth, cartController.getCart);

router.post("/", auth, cartController.addProductToCart);

router.put("/", auth, cartController.updateProductInCart);

router.put("/checkout", auth, cartController.checkout);

module.exports = router;