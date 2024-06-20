export const MethodsPatterns = {
  /**
   * Main service methods
   */
  getTreeById: 'tree_get_by_id',
  getFilteredTrees: 'tree_get_filtered',
  createTree: 'tree_create',
  updateTree: 'tree_update',
  deleteTree: 'tree_delete',
  getSectionById: 'section_get_by_id',
  updateSection: 'section_update',

  /**
   * User service methods
   */
  getUserById: 'user_get_by_id',
  createUser: 'user_create',
  getUserByCredentials: 'user_get_by_credentials',

  /**
   * Token service methods
   */
  createToken: 'token_create',
  deleteToken: 'token_delete',
  decodeToken: 'token_decode',

  /**
   * Permission service methods
   */
  checkPermissions: 'permissions_check',
};
