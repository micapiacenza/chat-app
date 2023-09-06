const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3001;
app.use(bodyParser.json());

/**
 * ------------------------------------------------------------------------------------------------
 * Write to JSON file
 */
// json file - users
const usersFilePath = 'data.json';
let data = [];
try {
  const dataFile = fs.readFileSync(usersFilePath, 'utf8');
  data = JSON.parse(dataFile);
} catch (error) {
  console.error('Error reading users data:', error);
}

// Json file - groups
const groupsFilePath = 'groups.json';
let groupsData = [];
try {
  groupsData = JSON.parse(fs.readFileSync(groupsFilePath, 'utf8'));
} catch (error) {
  console.error('Error reading groups data:', error);
}

// Json file - groups
const channelsFilePath = 'channels.json';
let channelsData = [];
try {
  channelsData = JSON.parse(fs.readFileSync(channelsFilePath, 'utf8'));
} catch (error) {
  console.error('Error reading channels data:', error);
}

/**
 * ------------------------------------------------------------------------------------------------
 * Auth
 */
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

    // Check if the username is available
    if (isUsernameAvailable(newUser.username)) {
      // Username is unique, proceed with user creation
      data.push(newUser);
      saveUserData();
      res.json(newUser);
    } else {
      // Username is not unique, send an error response
      res.status(400).json({ message: 'Username is already taken. Please choose another username.' });
    }

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

    // Send user details as plain JSON
    res.json(user);
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


/**
 * ------------------------------------------------------------------------------------------------
 * Helpers
 */
function generateUniqueId() {
  return uuidv4(undefined, undefined, undefined);
}

function saveUserData() {
  fs.writeFileSync(usersFilePath, JSON.stringify(data, null, 2), 'utf8');
}

function isUsernameAvailable(username) {
  // Check if the username exists in your data
  return !data.some((user) => user.username === username);
}

/**
 * ------------------------------------------------------------------------------------------------
 * Users
 */
// Create a new user
app.post('/api/create-user', (req, res) => {
  const newUser = req.body;
  newUser.id = generateUniqueId();

  // Check if the username is available
  if (isUsernameAvailable(newUser.username)) {
    // Username is unique, proceed with user creation
    data.push(newUser);
    saveUserData();
    res.json(newUser);
  } else {
    // Username is not unique, send an error response
    res.status(400).json({ message: 'Username is already taken. Please choose another username.' });
  }
});

// Get all users
app.get('/api/users', (req, res) => {
  res.json(data);
});

// Get a specific user by ID
app.get('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  const user = data.find(u => u.id === userId);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Update a user by ID
app.put('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body;
  const index = data.findIndex(u => u.id === userId);
  if (index !== -1) {
    data[index] = updatedUser;
    saveUserData();
    res.json(updatedUser);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Delete a user by ID
app.delete('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  const index = data.findIndex(u => u.id === userId);
  if (index !== -1) {
    const deletedUser = data.splice(index, 1)[0];
    saveUserData();
    res.json(deletedUser);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

/**
 * ------------------------------------------------------------------------------------------------
 * Groups
 */
// CRUD API for creating a new group
app.post('/api/create-group', (req, res) => {
  const { name, admins, channels, members } = req.body;

  // Check if the group name is already taken
  if (groupsData.some(group => group.name === name)) {
    res.status(400).json({ success: false, message: 'Group name already exists' });
  } else {
    // Create a new Group instance
    const newGroup = new Group(groupsData.length + 1, name, admins, channels, members);
    groupsData.push(newGroup);
    fs.writeFileSync(groupsFilePath, JSON.stringify(groupsData, null, 2));

    res.json({ success: true, message: 'Group created successfully', group: newGroup });
  }
});

// CRUD API for reading all groups
app.get('/api/groups', (req, res) => {
  res.json(groupsData);
});

// CRUD API for reading a specific group by ID
app.get('/api/groups/:groupId', (req, res) => {
  const groupId = parseInt(req.params.groupId);
  const group = groupsData.find(g => g.id === groupId);

  if (group) {
    res.json(group);
  } else {
    res.status(404).json({ success: false, message: 'Group not found' });
  }
});

// CRUD API for updating a group by ID
app.put('/api/groups/:groupId', (req, res) => {
  const groupId = parseInt(req.params.groupId);
  const { name, admins, channels, members } = req.body;
  const updatedGroupIndex = groupsData.findIndex(g => g.id === groupId);

  if (updatedGroupIndex !== -1) {
    // Update the group
    const updatedGroup = new Group(groupId, name, admins, channels, members);
    groupsData[updatedGroupIndex] = updatedGroup;
    fs.writeFileSync(groupsFilePath, JSON.stringify(groupsData, null, 2));
    res.json({ success: true, message: 'Group updated successfully', group: updatedGroup });
  } else {
    res.status(404).json({ success: false, message: 'Group not found' });
  }
});

// CRUD API for deleting a group by ID
app.delete('/api/groups/:groupId', (req, res) => {
  const groupId = parseInt(req.params.groupId);

  const groupIndex = groupsData.findIndex(g => g.id === groupId);

  if (groupIndex !== -1) {
    // Remove the group
    const deletedGroup = groupsData.splice(groupIndex, 1)[0];
    fs.writeFileSync(groupsFilePath, JSON.stringify(groupsData, null, 2));
    res.json({ success: true, message: 'Group deleted successfully', group: deletedGroup });
  } else {
    res.status(404).json({ success: false, message: 'Group not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

/**
 * ------------------------------------------------------------------------------------------------
 * Channels
 */

// CRUD API for creating a new channel
app.post('/create-channel', (req, res) => {
  const { name, groupId } = req.body;
  if (!name || !groupId) {
    return res.status(400).json({ message: 'Name and groupId are required fields.' });
  }

  const newChannel = new Channel(generateUniqueId(), name, groupId);
  channelsData.push(newChannel);

  fs.writeFile(channelsFilePath, JSON.stringify(channelsData), (err) => {
    if (err) {
      console.error('Error writing channels data:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    res.json(newChannel);
  });
});

// CRUD API for reading all channels
app.get('/channels', (req, res) => {
  res.json(channelsData);
});

// CRUD API for updating a channel by ID
app.put('/update-channel/:id', (req, res) => {
  const channelId = parseInt(req.params.id);
  const { name, groupId } = req.body;

  const channelToUpdate = channelsData.find((channel) => channel.id === channelId);
  if (!channelToUpdate) {
    return res.status(404).json({ message: 'Channel not found' });
  }

  if (name) {
    channelToUpdate.name = name;
  }
  if (groupId) {
    channelToUpdate.groupId = groupId;
  }

  fs.writeFile(channelsFilePath, JSON.stringify(channelsData), (err) => {
    if (err) {
      console.error('Error writing channels data:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    res.json(channelToUpdate);
  });
});

// CRUD API for deleting a channel by ID
app.delete('/delete-channel/:id', (req, res) => {
  const channelId = parseInt(req.params.id);

  const channelIndex = channelsData.findIndex((channel) => channel.id === channelId);
  if (channelIndex === -1) {
    return res.status(404).json({ message: 'Channel not found' });
  }

  channelsData.splice(channelIndex, 1);

  fs.writeFile(channelsFilePath, JSON.stringify(channelsData), (err) => {
    if (err) {
      console.error('Error writing channels data:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
    res.json({ message: 'Channel deleted successfully' });
  });
});

/**
 * Models
 */
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

class Group {
  constructor(id, name, admins, channels, members) {
    this.id = id;
    this.name = name;
    this.admins = admins;
    this.channels = channels;
    this.members = members;
    this.pendingMembers = [];
  }
}

class Channel {
  constructor(id, name, groupId) {
    this.id = id;
    this.name = name;
    this.groupId = groupId;
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

