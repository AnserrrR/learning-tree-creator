import { JwtTypeEnum } from '../enums/jwt-type.enum';

/**
 * Input for creating JWT
 */
export interface IJwtPayloadCreate {
  /**
   * User or ApiToken Identifier
   */
  id: string;
  /**
   * Type of token (User or external service)
   */
  type: JwtTypeEnum;
  /**
   * Key of JWT. Must match the jwtKey in the DocuBackUserEntity.
   */
  key?: string;
}

/**
 * Payload of JWT
 */
export type IJwtPayload = IJwtPayloadCreate & {
  /**
   * Issued At Time.
   */
  iat: number;
  /**
   * Expiration date of JWT in seconds.
   */
  exp: number;
};
