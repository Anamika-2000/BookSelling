const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');

const {handleWebhook, createPaymentIntent } = require("../controllers/PaymentController");
const { authenticateToken } = require("../middlewares/auth");

router.post('/webhook', bodyParser.raw({ type: 'application/json' }), authenticateToken,handleWebhook);
router.post('/create',authenticateToken, createPaymentIntent);

module.exports = router;
