import { SetMetadata } from '@nestjs/common';
import { JwtTypeEnum } from '../enums/jwt-type.enum';

/**
 * Metadata key for checking JWT type.
 */
export const METADATA_JWTTYPE_KEY = 'jwtType';

/**
 * Decorator for checking JWT type.
 *
 * !!! Resolver or Endpoint MUST be decorated with «@UseGuards(JwtTypeGuard)» !!!
 */
export const JwtType = (...authTypes: JwtTypeEnum[]) => SetMetadata(METADATA_JWTTYPE_KEY, authTypes);
