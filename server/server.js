const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());

// Load existing data.json file (if it exists)
let data = [];
try {
  const dataFile = fs.readFileSync('data.json', 'utf8');
  data = JSON.parse(dataFile);
} catch (error) {
  console.error('Error reading data.json file:', error);
}

// register user
app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password, selectedRole } = req.body;

    // Check if the email is already in use
    const userWithEmail = data.find((user) => user.email === email);
    if (userWithEmail) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Generate a unique user ID (you can use a library like `uuid`)
    const userId = generateUniqueId();

    // Create a new User instance and add it to the data array
    const newUser = new User(userId, username, email, password, [selectedRole]);
    data.push(newUser);

    // Save the updated data to the JSON file
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
    res.status(201).json({ message: 'User registered successfully' });
    console.log('User registered successfully', newUser);

  } catch (error) {
    if (error.code === 'ENOENT') {
      fs.writeFileSync('data.json', '[]', 'utf8');
    } else {
      console.error('Error reading data.json file:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }

  }
});

// Endpoint to login and get a JWT token
app.post('/api/login', async (req, res) => {
  try {
    const { email, pwd } = req.body;

    // Load the user data from the data.json file
    let data = [];

    try {
      const dataFile = fs.readFileSync('data.json', 'utf8');
      data = JSON.parse(dataFile);
    } catch (error) {
      console.error('Error reading data.json file:', error);
    }

    // Find the user by email
    const user = data.find((user) => user.email === email);
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    // Compare the password directly (as plain text)
    if (user.password !== pwd) return res.status(401).json({ message: 'Invalid email or password' });

    // Generate a JWT token and send it as a response
    const token = jwt.sign({ email: email, password: pwd }, 'secret-key', { expiresIn: '1h' }, { algorithm: 'RS256' });
    res.json({ token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});




function generateUniqueId() {
  return uuidv4(undefined, undefined, undefined);
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

class User {
  constructor(id, username, email, password, roles, groups) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.roles = roles;
    this.groups = groups;
  }
}

const superAdminRole = {
  name: 'SuperAdmin',
  permissions: {
    canPromoteToGroupAdmin: true,
    canRemoveUser: true,
    canUpgradeToSuperAdmin: true,
    canCreateGroup: true,
    canCreateChannel: true,
    canRemoveGroup: true,
    canRemoveChannel: true,
    canRemoveChatUser: true,
    canDeleteChatUser: true,
    canBanUserFromChannel: true,
    canReportToSuperAdmin: true,
  },
};

const groupAdminRole = {
  name: 'GroupAdmin',
  permissions: {
    canCreateGroup: true,
    canCreateChannel: true,
    canRemoveGroup: true,
    canRemoveChannel: true,
    canRemoveChatUser: true,
    canDeleteChatUser: true,
    canBanUserFromChannel: true,
    canReportToSuperAdmin: true,
  },
};

const chatUserRole = {
  name: 'ChatUser',
  permissions: {
    canCreateChatUser: true,
    canJoinChannel: true,
    canRegisterInterestInGroup: true,
    canLeaveGroup: true,
    canDeleteOwnAccount: true,
    canLogout: true,
  },
};

