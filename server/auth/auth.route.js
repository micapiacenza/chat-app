const express = require('express');
const controller = require('./auth.controller');

const router = express.Router();

/**
 * Register a new user
 */
router.post('/register', async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const result = await controller.registerUser(email, username, password);

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }

    return res.status(200).json({ message: result.message });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});


/**
 * User login
 */
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await controller.loginUser(email, password);

    if (result.error) {
      return res.status(401).json({ error: result.error });
    }

    // Here, you can return a token or the user object as needed
    // For now, we'll just return the user object
    return res.status(200).json({ user: result.user });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

module.exports = router;
