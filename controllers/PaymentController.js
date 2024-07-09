const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Cart = require('../models/cart');
const Order = require('../models/order');

const MINIMUM_CHARGE_AMOUNT = 50;

const createPaymentIntent = async (req, res) => {
  try {
    const { userId } = req.body;

    const cart = await Cart.findOne({ userId }).populate('items.bookId', 'title price');
    if (!cart) {
      return res.status(404).send({ message: 'Cart not found' });
    }
 
    const totalAmount = cart.items.reduce((acc, item) => acc + item.quantity * item.bookId.price, 0);
    console.log(totalAmount);

    if (totalAmount * 100 < MINIMUM_CHARGE_AMOUNT) {
      return res.status(400).send({
        message: `The total amount must be at least $${MINIMUM_CHARGE_AMOUNT / 100} to process the payment.`,
      });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount * 100,
      currency: 'usd',
      metadata: { userId: userId.toString() },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
      amount: totalAmount,
      message: 'Payment intent created successfully',
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const handleWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    const userId = paymentIntent.metadata.userId;

    const cart = await Cart.findOne({ userId }).populate('items.bookId', 'title price');
    if (cart) {
      const order = new Order({
        userId: userId,
        items: cart.items,
        totalAmount: paymentIntent.amount / 100,
        paymentIntentId: paymentIntent.id,
        status: 'paid',
      });
      await order.save();
      cart.items = [];
      await cart.save();
    }
  }
  res.send({ received: true });
};

module.exports = {
  createPaymentIntent,
  handleWebhook,
};
