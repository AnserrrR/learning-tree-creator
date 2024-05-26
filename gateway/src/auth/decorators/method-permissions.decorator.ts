import { SetMetadata } from '@nestjs/common';

/**
 * Metadata key for checking permissions
 */
export const METADATA_PERMISSIONS_KEY = 'permissions';

/**
 * Decorator for checking permissions
 */
export const MethodPermissions = (permissions: string[] | string) => SetMetadata(
  METADATA_PERMISSIONS_KEY,
  permissions,
);
