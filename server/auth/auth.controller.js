const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require('../user/user.model');

const registerUser = async (email, username, password, role) => {
  try {
    // Check if a user with the provided email or username already exists
    const existingUser = await UserModel.findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
      return { error: 'User with this email or username already exists' };
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);


    // Create a new user
    const newUser = new UserModel({
      email,
      username,
      pwd: hashedPassword,
      role,
    });

    await newUser.save();

    return { message: 'User registered successfully' };
  } catch (error) {
    console.log('User Registration error:', error);
    throw error;
  }
};

const loginUser = async (email, pwd) => {
  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      return { error: 'User not found' };
    }

    // Compare the hashed password
    const passwordMatch = await bcrypt.compare(pwd, user.pwd);

    if (!passwordMatch) {
      return { error: 'Incorrect password' };
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      'chat-app',
      { expiresIn: '1h' }
    );

    // Include user information in the response
    const userResponse = {
      token,
      username: user.username,
      email: user.email,
      role: user.role,
      id: user._id
    };

    return userResponse;
  } catch (error) {
    console.log('User Login error:', error);
    throw error;
  }
};

module.exports = {
  registerUser,
  loginUser,
};
