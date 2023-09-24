const express = require('express');
const controller = require('./auth.controller');

const router = express.Router();

/**
 * Register a new user
 */
router.post('/register', async (req, res, next) => {
  try {
    const { email, username, password, role } = req.body;
    const result = await controller.registerUser(email, username, password, role);

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
    const { email, pwd } = req.body;
    const result = await controller.loginUser(email, pwd);

    if (result.error) {
      return res.status(401).json({ error: result.error });
    }

    // Return the extended user information in the response
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});


module.exports = router;
