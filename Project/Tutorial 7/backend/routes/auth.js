const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth');

// SIGNUP
router.post('/signup', async (req, res) => {
  try {
    const {
      firstName, lastName, username, email,
      password, confirmPassword, phoneNumber, country
    } = req.body;

    // Validate fields
    if (!firstName || !lastName || !username || !email ||
        !password || !confirmPassword || !phoneNumber || !country) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ confirmPassword: 'Passwords must match' });
    }

    // Check if username or email already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({ email: 'Email already in use' });
      }
      return res.status(400).json({ username: 'Username already taken' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      firstName, lastName, username, email,
      password: hashedPassword, phoneNumber, country
    });

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });

    return res.status(201).json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(403).json({ general: 'Wrong credentials, please try again' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(403).json({ general: 'Wrong credentials, please try again' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });

    return res.json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

// GET USER DETAILS
router.get('/user', auth, async (req, res) => {
  try {
    return res.json({
      userCredentials: {
        firstName:   req.user.firstName,
        lastName:    req.user.lastName,
        username:    req.user.username,
        email:       req.user.email,
        phoneNumber: req.user.phoneNumber,
        country:     req.user.country,
        imageUrl:    req.user.imageUrl,
        createdAt:   req.user.createdAt,
      }
    });
  } catch (err) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

// UPDATE USER DETAILS
router.post('/user', auth, async (req, res) => {
  try {
    const allowed = ['firstName', 'lastName', 'country'];
    const updates = {};
    allowed.forEach((field) => {
      if (req.body[field]) updates[field] = req.body[field];
    });

    await User.findByIdAndUpdate(req.user._id, updates);
    return res.json({ message: 'Updated successfully' });
  } catch (err) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

// UPLOAD PROFILE PHOTO
router.post('/user/image', auth, async (req, res) => {
  try {
    // For now store as base64 or a URL string sent from the client
    // Full file upload requires cloud storage (Cloudinary etc.)
    const { imageUrl } = req.body;
    if (!imageUrl) return res.status(400).json({ error: 'No image URL provided' });

    await User.findByIdAndUpdate(req.user._id, { imageUrl });
    return res.json({ message: 'Image updated successfully' });
  } catch (err) {
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
