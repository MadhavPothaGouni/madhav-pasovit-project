const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const sendOrderEmail = require('../utils/sendEmail');
const User = require('../models/User');

exports.createOrder = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Login required' });

    // items can come from server cart or request body
    let cart = await Cart.findOne({ user: userId }).populate('items.product');
    if (!cart || cart.items.length === 0) return res.status(400).json({ message: 'Cart is empty' });

    const items = cart.items.map(i => ({
      product: i.product._id,
      name: i.product.name,
      size: i.size,
      qty: i.qty,
      price: i.product.price
    }));

    const totalPrice = items.reduce((s, it) => s + it.qty * it.price, 0);

    const order = await Order.create({
      user: userId,
      items,
      totalPrice,
      orderDate: new Date(),
      status: 'Processing'
    });

    // optional: decrement stock (simple)
    for (const it of cart.items) {
      await Product.findByIdAndUpdate(it.product._id, { $inc: { stock: -it.qty } });
    }

    // clear cart
    cart.items = [];
    await cart.save();

    const user = await User.findById(userId);
    await sendOrderEmail(order, user);

    res.status(201).json({ orderId: order._id });
  } catch (err) { next(err); }
};
