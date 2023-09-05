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

module.exports = {
  User,
  Group,
  Channel,
};
