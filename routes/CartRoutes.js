const express = require("express");
const router = express.Router();
const { addToCart, removeFromCart, clearCart, updateCartItemQuantity, getCartItems } = require("../controllers/CartController");
const { authenticateToken } = require("../middlewares/auth");

router.post("/addToCart", authenticateToken, addToCart);
router.delete("/removeFromCart", authenticateToken,removeFromCart);
router.get("/getCartItems",authenticateToken, getCartItems);
router.put("/updateCartItem",authenticateToken, updateCartItemQuantity);
router.delete("/clearCart", authenticateToken,clearCart);


module.exports = router;
