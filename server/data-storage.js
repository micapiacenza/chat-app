const fs = require('fs');
const chatData = require('./data.json');
const { User } = require('./models/app.models');

let data = {
  users: [],
  groups: [],
  channels: [],
};

// Load data from JSON file on server startup
function loadData() {
  try {
    const jsonData = fs.readFileSync('data.json', 'utf8');
    data = JSON.parse(jsonData);
  } catch (error) {
    console.log(error);
    error.message = 'Error loading data from JSON file';
  }
}

// Helper function to generate a unique ID (you can replace this with your own logic)
function generateUniqueId() {
  return 'user_' + Math.random().toString(36).substr(2, 9);
}

// Function to save data to JSON file
function saveData() {
  fs.writeFileSync('data.json', JSON.stringify(chatData, null, 2));
}

/**
 * Super Administrator
 */
// A Super Admin can promote a chat user to a Group Admin role.
export function promoteToGroupAdmin(superAdminId, userIdToPromote) {
  const superAdmin = chatData.users.find((user) => user.id === superAdminId);

  if (!superAdmin) {
    throw new Error('Invalid Super Admin specified.');
  }

  // Check if the user to be promoted exists in the data
  const userToPromote = chatData.users.find((user) => user.id === userIdToPromote);

  if (!userToPromote) {
    throw new Error('Invalid user specified.');
  }

  // Check if the Super Admin has the necessary permissions to promote users
  if (!superAdmin.roles.includes('SuperAdmin')) {
    throw new Error('You do not have the necessary permissions to promote users.');
  }

  // Promote the user to a Group Admin role
  if (!userToPromote.roles.includes('GroupAdmin')) {
    userToPromote.roles.push('GroupAdmin');
  }

  saveData();
}

// A Super Admin can remove any chat users.
export function removeChatUser(superAdminId, userIdToRemove) {
  const superAdmin = chatData.users.find((user) => user.id === superAdminId);

  if (!superAdmin) {
    throw new Error('Invalid Super Admin specified.');
  }

  // Check if the user to be removed exists in the data
  const userToRemove = chatData.users.find((user) => user.id === userIdToRemove);

  if (!userToRemove) {
    throw new Error('Invalid user specified.');
  }

  // Check if the Super Admin has the necessary permissions to remove users
  if (!superAdmin.roles.includes('SuperAdmin')) {
    throw new Error('You do not have the necessary permissions to remove users.');
  }

  // Remove the user from all groups they belong to
  chatData.groups.forEach((group) => {
    if (group.members.includes(userIdToRemove)) {
      const userIndexInGroup = group.members.indexOf(userIdToRemove);
      if (userIndexInGroup !== -1) {
        group.members.splice(userIndexInGroup, 1);
      }
    }
  });

  // Remove the user from the data
  const userIndexInData = chatData.users.indexOf(userToRemove);
  if (userIndexInData !== -1) {
    chatData.users.splice(userIndexInData, 1);
  }

  saveData();
}

// A Super Admin can upgrade a chat user to Super Admin role.
export function upgradeToSuperAdmin(superAdminId, userIdToUpgrade) {
  const superAdmin = chatData.users.find((user) => user.id === superAdminId);

  if (!superAdmin) {
    throw new Error('Invalid Super Admin specified.');
  }

  // Check if the user to be upgraded exists in the data
  const userToUpgrade = chatData.users.find((user) => user.id === userIdToUpgrade);

  if (!userToUpgrade) {
    throw new Error('Invalid user specified.');
  }

  // Check if the Super Admin has the necessary permissions to upgrade users
  if (!superAdmin.roles.includes('SuperAdmin')) {
    throw new Error('You do not have the necessary permissions to upgrade users.');
  }

  // Upgrade the user to a Super Admin role
  if (!userToUpgrade.roles.includes('SuperAdmin')) {
    userToUpgrade.roles.push('SuperAdmin');
  }

  saveData();
}

// A Super Admin has all of the functions of a group administrator

/**
 * Group Administrator
 */
// A Group Admin can create groups.
export function createGroup(adminId, groupName) {
  // Check if the admin exists
  const admin = chatData.users.find((user) => user.id === adminId);

  if (!admin) {
    throw new Error('Invalid group admin specified.');
  }

  // Check if the admin is indeed a Super Admin
  if (admin.roles.includes('SuperAdmin')) {
    // Create the group
    const newGroup = {
      id: generateUniqueId(), // You need to implement a function to generate unique IDs
      name: groupName,
      admins: [adminId],
      channels: [],
      members: [adminId],
    };

    chatData.groups.push(newGroup);

    // Add the group ID to the admin's list of groups
    admin.groups.push(newGroup.id);

    saveData();
  } else {
    throw new Error('You do not have the necessary permissions to create a group.');
  }
}

// A Group Admin will create channels within groups.
export function createChannel(adminId, groupId, channelName) {
  const group = chatData.groups.find((group) => group.id === groupId);

  if (!group) {
    throw new Error('Invalid group specified.');
  }

  const admin = chatData.users.find((user) => user.id === adminId);

  if (!admin) {
    throw new Error('Invalid group admin specified.');
  }

  // Check if the admin is indeed a Super Admin or Group Admin for the specified group
  if (admin.roles.includes('SuperAdmin') || (admin.roles.includes('GroupAdmin') && group.admins.includes(adminId))) {
    // Create a new channel and add it to the group's channels
    const newChannel = {
      id: generateUniqueId(), // You need to implement a function to generate unique IDs
      name: channelName,
      groupId,
    };

    group.channels.push(newChannel);

    saveData();
  } else {
    throw new Error('You do not have the necessary permissions to create a channel in this group.');
  }
}

// A Group Admin can remove groups, channels, and chat users from groups they administer.
export function deleteChannel(adminId, groupId, channelId) {
  const group = chatData.groups.find((group) => group.id === groupId);

  if (!group) {
    throw new Error('Invalid group specified.');
  }

  const channelIndex = group.channels.findIndex((channel) => channel.id === channelId);

  if (channelIndex === -1) {
    throw new Error('Invalid channel specified.');
  }

  const channel = group.channels[channelIndex];

  // Check if the admin is indeed a Super Admin or Group Admin for the specified group
  if (admin.roles.includes('SuperAdmin') || (admin.roles.includes('GroupAdmin') && group.admins.includes(adminId))) {
    // Remove the channel from the list of channels in the group
    group.channels.splice(channelIndex, 1);

    saveData();
  } else {
    throw new Error('You do not have the necessary permissions to remove this channel.');
  }
}

// A group admin can delete a chat user (from a group they administer)
export function deleteChatUser(adminId, groupId, userIdToDelete) {
  const group = chatData.groups.find((group) => group.id === groupId);

  if (!group) {
    throw new Error('Invalid group specified.');
  }

  // Check if the admin is indeed a Super Admin or Group Admin for the specified group
  if (admin.roles.includes('SuperAdmin') || (admin.roles.includes('GroupAdmin') && group.admins.includes(adminId))) {
    const userIndexInGroup = group.members.indexOf(userIdToDelete);

    if (userIndexInGroup !== -1) {
      // Remove the user from the group's members
      group.members.splice(userIndexInGroup, 1);

      // Remove the group from the user's list of groups
      chatData.users.forEach((user) => {
        if (user.id === userIdToDelete) {
          const userGroupIndex = user.groups.indexOf(groupId);
          if (userGroupIndex !== -1) {
            user.groups.splice(userGroupIndex, 1);
          }
        }
      });

      saveData();
    }
  } else {
    throw new Error('You do not have the necessary permissions to delete a chat user from this group.');
  }
}

// A group admin can only modify/delete a group that they created.
export function deleteGroup(adminId, groupId) {
  const admin = chatData.users.find((user) => user.id === adminId);
  const groupIndex = chatData.groups.findIndex((group) => group.id === groupId);

  if (!admin) {
    throw new Error('Invalid group admin specified.');
  }

  if (groupIndex === -1) {
    throw new Error('Invalid group specified.');
  }

  const group = chatData.groups[groupIndex];

  // Check if the admin is indeed the creator of the group
  if (group.admins.includes(adminId)) {
    // Remove the group from the admin's list of groups
    const adminGroupIndex = admin.groups.indexOf(groupId);
    if (adminGroupIndex !== -1) {
      admin.groups.splice(adminGroupIndex, 1);
    }

    // Delete the group
    chatData.groups.splice(groupIndex, 1);

    saveData();
  } else {
    throw new Error('You do not have the necessary permissions to delete this group.');
  }
}

// A group admin can ban a user from a channel and report to super admins
export function banUserFromChannel(groupId, channelId, adminId, userIdToBan) {
  const group = chatData.groups.find((group) => group.id === groupId);
  if (!group) {
    throw new Error('Invalid group specified.');
  }

  const channel = group.channels.find((channel) => channel.id === channelId);
  if (!channel) {
    throw new Error('Invalid channel specified.');
  }

  const admin = chatData.users.find((user) => user.id === adminId);
  if (!admin) {
    throw new Error('Invalid group admin specified.');
  }

  // Check if the admin is indeed a Super Admin or Group Admin for the specified group
  if (admin.roles.includes('SuperAdmin') || (admin.roles.includes('GroupAdmin') && group.admins.includes(adminId))) {
    // Remove the user from the channel's members if they are a member
    const userIndexInChannel = channel.members.indexOf(userIdToBan);
    if (userIndexInChannel !== -1) {
      channel.members.splice(userIndexInChannel, 1);
    }

    // Report the banned user to super admins
    const superAdmins = chatData.users.filter((user) => user.roles.includes('SuperAdmin'));
    superAdmins.forEach((superAdmin) => {
      // May also update a list of reported users in the data
    });

    saveData();
  } else {
    throw new Error('You do not have the necessary permissions to perform this action.');
  }
}

/**
 * Chat User
 */
// A user of the system can create a new chat user. (Usernames are unique)
export function createUser(newUser) {
  // Check if the username is already taken
  const isUsernameTaken = chatData.users.some((user) => user.username === newUser.username);

  if (isUsernameTaken) {
    throw new Error('Username already exists. Please choose a different username.');
  }
  newUser.id = generateUniqueId();
  newUser.roles = ['ChatUser'];
  newUser.groups = [];
  chatData.users.push(newUser);
  saveData();
}

// A chat user can join any channel in a group once they are members of a group.
export function joinChannel(userId, groupId, channelId) {
  const user = chatData.users.find((user) => user.id === userId);
  const group = chatData.groups.find((group) => group.id === groupId);
  const channel = group.channels.find((channel) => channel.id === channelId);

  if (!user || !group || !channel) {
    throw new Error('Invalid user, group, or channel specified.');
  }

  // Check if the user is already a member of the group
  if (!user.groups.includes(groupId)) {
    throw new Error('User is not a member of the specified group.');
  }

  // Add the user to the channel's members if not already a member
  if (!channel.members.includes(userId)) {
    channel.members.push(userId);
  }

  saveData();
}

// A chat user can register an interest in a group, to be added by the group admin.
export function registerInterestInGroup(userId, groupId) {
  const user = chatData.users.find((user) => user.id === userId);
  const group = chatData.groups.find((group) => group.id === groupId);

  if (!user || !group) {
    throw new Error('Invalid user or group specified.');
  }

  // Check if the user is already a member of the group
  if (user.groups.includes(groupId)) {
    throw new Error('User is already a member of the specified group.');
  }

  // Add the user's ID to the group's pendingMembers array
  group.pendingMembers.push(userId);

  saveData();
}

// A chat user can leave a group or groups they belong to.
export function leaveGroup(userId, groupId) {
  const user = chatData.users.find((user) => user.id === userId);

  if (!user) {
    throw new Error('Invalid user specified.');
  }

  // Check if the user is a member of the specified group
  if (!user.groups.includes(groupId)) {
    throw new Error('User is not a member of the specified group.');
  }

  // Remove the user's ID from the group's members array
  const group = chatData.groups.find((group) => group.id === groupId);
  const userIndex = group.members.indexOf(userId);

  if (userIndex !== -1) {
    group.members.splice(userIndex, 1);
  }

  saveData();
}
// A chat user can delete themselves
export function deleteUser(userId) {
  const userIndex = chatData.users.findIndex((user) => user.id === userId);

  if (userIndex === -1) {
    throw new Error('User not found.');
  }

  // Remove the user from all groups they belong to
  chatData.users[userIndex].groups.forEach((groupId) => {
    const group = chatData.groups.find((group) => group.id === groupId);
    if (group) {
      const userIndexInGroup = group.members.indexOf(userId);
      if (userIndexInGroup !== -1) {
        group.members.splice(userIndexInGroup, 1);
      }
    }
  });

  // Remove the user from the main users array
  chatData.users.splice(userIndex, 1);

  saveData();
}

module.exports = {
  loadData,
  saveData,
};
