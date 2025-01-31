const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartcontroller');
const auth = require('../middleware/auth');
// Add book to cart
router.post('/cart', auth,cartController.addToCart);

// Get cart items
router.get('/cart', auth,cartController.getCart);

// Remove book from cart
router.delete('/cart',auth, cartController.removeFromCart);
router.put('/cart/quantity', auth, cartController.updateQuantity);
router.delete('/cart/clear', auth, cartController.clearCart); // Route to clear cart

module.exports = router;
