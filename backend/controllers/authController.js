// backend/controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const createToken = (user) =>
  jwt.sign({ id: user._id, email: user.email, name: user.name }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });

// cookie options used for local dev (sameSite: 'lax' + secure:false)
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production', // true on prod (HTTPS)
  sameSite: 'lax', // OK when frontend and backend look like same-origin via proxy
  path: '/',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: 'All fields required' });

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'User already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hashed });
    const token = createToken(user);

    res.cookie('token', token, cookieOptions);
    res.status(201).json({ user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    console.log('=== LOGIN ATTEMPT ===');
    console.log('Payload:', req.body);

    const { email, password } = req.body;
    if (!email || !password) {
      console.log('Missing email or password');
      return res.status(400).json({ message: 'All fields required' });
    }

    const user = await User.findOne({ email });
    console.log('User found:', Boolean(user));
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    console.log('Stored password (hashed):', user.password.slice(0, 30) + '...'); // don't print full hash in prod
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('bcrypt compare result:', isMatch);

    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = createToken(user);
    res.cookie('token', token, { httpOnly: true, secure: false, sameSite: 'lax' });
    res.json({ user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    next(err);
  }
};


exports.logout = (req, res) => {
  // clear cookie with same options to ensure removal
  res.clearCookie('token', { path: '/', sameSite: 'lax' });
  res.json({ message: 'Logged out' });
};
