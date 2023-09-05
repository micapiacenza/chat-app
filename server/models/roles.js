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
