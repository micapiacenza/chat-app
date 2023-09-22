const UserModel = require('../user/user.model'); // Adjust the path based on your project structure

const registerUser = async (email, username, password) => {
  try {
    // Check if a user with the provided email already exists
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return { error: 'User with this email already exists' };
    }

    // Create a new user
    const newUser = new UserModel({
      email,
      username,
      pwd: password, // You might want to hash the password before storing it
    });

    await newUser.save();

    return { message: 'User registered successfully' };
  } catch (error) {
    throw error;
  }
};

const loginUser = async (email, password) => {
  try {
    // Check if a user with the provided email exists
    const user = await UserModel.findOne({ email });

    if (!user) {
      return { error: 'User not found' };
    }

    // Compare the provided password with the stored password (you should use bcrypt for this)
    if (user.pwd !== password) {
      return { error: 'Incorrect password' };
    }

    // Return the user object or a token, depending on your authentication method
    return { user }; // You might want to generate and return a token here
  } catch (error) {
    throw error;
  }
};

module.exports = {
  registerUser,
  loginUser,
};
