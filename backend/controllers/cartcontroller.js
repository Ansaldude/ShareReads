const Cart = require('../models/cart');
const Book = require('../models/book');

// Add book to cart
exports.addToCart = async (req, res) => {
    try {
        const userId = req.user._id; // Get user ID from authenticated token
        const bookId = req.body.bookId;

        if (!bookId) {
            return res.status(400).send('Book ID is required');
        }

        let cart = await Cart.findOne({ userId: userId });

        if (cart) {
            // If cart exists, check if book is already in the cart
            const itemIndex = cart.items.findIndex(item => item.book.toString() === bookId);
            if (itemIndex > -1) {
                // If book exists, increase quantity
                cart.items[itemIndex].quantity += 1;
            } else {
                // If book does not exist, add new item
                cart.items.push({ book: bookId });
            }
            await cart.save();
        } else {
            // If cart does not exist, create a new cart
            cart = new Cart({
                userId: userId,
                items: [{ book: bookId }]
            });
            await cart.save();
        }

        res.send("Book added to cart");
    } catch (err) {
        console.error('Error adding book to cart:', err);
        res.status(500).send('Server error');
    }
};

// Get cart items
// Updated getCart to include cartId
exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user._id }).populate('items.book');
        if (!cart) return res.status(404).send('Cart not found');
        res.json({
            cartId: cart._id, // Ensure cartId is included
            items: cart.items
        });
    } catch (err) {
        res.status(500).send('Server error');
    }
};

exports.removeFromCart = async (req, res) => {
    try {
        const { bookId } = req.body;
        await Cart.updateOne(
            { userId: req.user._id },
            { $pull: { items: { book: bookId } } }
        );
        res.status(200).send('Book removed from cart');
    } catch (err) {
        res.status(500).send('Server error');
    }
};

// Update Quantity
exports.updateQuantity = async (req, res) => {
    try {
        const { bookId, quantity } = req.body;
        await Cart.updateOne(
            { userId: req.user._id, 'items.book': bookId },
            { $set: { 'items.$.quantity': quantity } }
        );
        res.status(200).send('Quantity updated');
    } catch (err) {
        res.status(500).send('Server error');
    }
};

exports.clearCart = async (req, res) => {
    try {
        const userId = req.user._id;
        await Cart.deleteMany({ userId }); // Clear all carts for the user
        res.status(200).send('Cart cleared successfully');
    } catch (err) {
        console.error('Error clearing cart:', err.message);
        res.status(500).send(`Server error: ${err.message}`);
    }
};