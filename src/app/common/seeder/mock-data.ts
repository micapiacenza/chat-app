import { UserRole } from "../enums/user-role.enum";

export const MockData = {
  users: [
    {
      id: 1,
      username: 'superadmin',
      email: 'superadmin@example.com',
      pwd: 'qwerty',
      roles: [UserRole.SuperAdmin],
      groups: [],
    },
    {
      id: 2,
      username: 'groupadmin1',
      email: 'groupadmin1@example.com',
      pwd: 'qwerty',
      roles: [UserRole.GroupAdmin],
      groups: [],
    },
    {
      id: 3,
      username: 'user1',
      email: 'user1@example.com',
      pwd: 'qwerty',
      roles: [UserRole.User],
      groups: [],
    },
    {
      id: 4,
      username: 'user2',
      email: 'user2@example.com',
      pwd: 'qwerty',
      roles: [UserRole.User],
      groups: [],
    },
    // Add more users
  ],
  groups: [
    {
      id: 1,
      name: 'Technology Enthusiasts',
      admins: [],
      channels: [],
      members: [],
    },
    {
      id: 2,
      name: 'Creative Minds',
      admins: [],
      channels: [],
      members: [],
    },
    // Add more groups
  ],
  channels: [
    {
      id: 1,
      name: 'General Chat',
      groupId: 1,
    },
    {
      id: 2,
      name: 'Programming Corner',
      groupId: 1,
    },
    {
      id: 3,
      name: 'Art Gallery',
      groupId: 2,
    },
    {
      id: 4,
      name: 'Design Discussion',
      groupId: 2,
    },
    // Add more channels
  ],
};
