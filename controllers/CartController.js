const Cart = require('../models/cart');
const Book = require('../models/product')

const addToCart = async (req, res) => {
    try {
      const { userId, items } = req.body;
      for (const item of items) {
        const book = await Book.findById(item.bookId);
        if (!book) {
          return res.status(404).send({ message: `Book not found: ${item.bookId}` });
        }
      }
      let cart = await Cart.findOne({ userId });
      if (!cart) {
        cart = new Cart({ userId, items: [] });
      }
      for (const item of items) {
        const cartItem = cart.items.find(ci => ci.bookId.equals(item.bookId));
        if (cartItem) {
          cartItem.quantity += item.quantity;
        } else {
          cart.items.push(item);
        }
      }
      await cart.save();
      res.send({ message: 'Items added to cart successfully', data: cart });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };

  const removeFromCart = async (req, res) => {
    try {
      const { userId, items } = req.body;
      let cart = await Cart.findOne({ userId });
      if (!cart) {
        return res.status(404).send({ message: 'Cart not found' });
      }
      for (const item of items) {
        const cartItemIndex = cart.items.findIndex(ci => ci.bookId.equals(item.bookId));
        if (cartItemIndex >= 0) {
          if (cart.items[cartItemIndex].quantity <= item.quantity) {
            cart.items.splice(cartItemIndex, 1);
          } else {
            cart.items[cartItemIndex].quantity -= item.quantity;
          }
        }
      }
  
      await cart.save();
  
      res.send({ message: 'Items removed from cart successfully', data: cart });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };

  const getCartItems = async (req, res) => {
    try {
      const userId = req.body.userId;
      const cart = await Cart.findOne({ userId }).populate('items.bookId', 'title price author');
      if (!cart) {
        return res.status(404).send({ message: 'Cart not found' });
      }
  
      res.send({ message: 'Cart items retrieved successfully', data: cart.items });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };

  const updateCartItemQuantity = async (req, res) => {
    try {
      const { userId, bookId, quantity } = req.body;
  
      const cart = await Cart.findOne({ userId });
      if (!cart) {
        return res.status(404).send({ message: 'Cart not found' });
      }
  
      const cartItem = cart.items.find(ci => ci.bookId.equals(bookId));
      if (!cartItem) {
        return res.status(404).send({ message: 'Item not found in cart' });
      }
      cartItem.quantity = quantity;
  
      await cart.save();
  
      res.send({ message: 'Cart item quantity updated successfully', data: cart });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };

  const clearCart = async (req, res) => {
    try {
      const userId  = req.body.userId;
      const cart = await Cart.findOne({ userId });
      if (!cart) {
        return res.status(404).send({ message: 'Cart not found' });
      }
      cart.items = [];
      await cart.save();
      res.send({ message: 'Cart cleared successfully' });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };

module.exports = {
  addToCart,
  removeFromCart,
  getCartItems,
  updateCartItemQuantity,
  clearCart
};
