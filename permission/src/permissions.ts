export const UserPermissions = [
  // Main service methods
  'tree_get_by_id',

  // User service methods
  'user_get_by_id',
  'user_create',
  'user_get_by_credentials',

  // Token service methods
  'token_create',
  'token_delete',
  'token_decode',
];

export const AdminPermissions = [
  ...UserPermissions,
];
