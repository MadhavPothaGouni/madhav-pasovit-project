const Cart = require('../models/Cart');

exports.getCart = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.json({ items: [] }); 
    const cart = await Cart.findOne({ user: userId }).populate('items.product');
    res.json(cart || { items: [] });
  } catch (err) { next(err); }
};

exports.addToCart = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Login to sync cart' });

    const { productId, size, qty = 1 } = req.body;
    let cart = await Cart.findOne({ user: userId });
    if (!cart) cart = await Cart.create({ user: userId, items: [] });

    const idx = cart.items.findIndex(i => i.product.toString() === productId && i.size === size);
    if (idx > -1) {
      cart.items[idx].qty += qty;
    } else {
      cart.items.push({ product: productId, size, qty });
    }
    await cart.save();
    res.json(cart);
  } catch (err) { next(err); }
};

exports.updateCart = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const { items } = req.body; 
    if (!userId) return res.status(401).json({ message: 'Login to update cart' });
    let cart = await Cart.findOne({ user: userId });
    if (!cart) cart = await Cart.create({ user: userId, items: [] });

    cart.items = items.map(i => ({ product: i.productId, size: i.size, qty: i.qty }));
    await cart.save();
    res.json(cart);
  } catch (err) { next(err); }
};

exports.removeFromCart = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const { productId, size } = req.body;
    if (!userId) return res.status(401).json({ message: 'Login to modify cart' });

    let cart = await Cart.findOne({ user: userId });
    if (!cart) return res.json({ items: [] });

    cart.items = cart.items.filter(i => !(i.product.toString() === productId && i.size === size));
    await cart.save();
    res.json(cart);
  } catch (err) { next(err); }
};
