import { Injectable } from '@nestjs/common';
import { ConfigService } from './config/config.service';
import jwt from 'jsonwebtoken';
import { TokenEntity } from './entites/token.entity';

@Injectable()
export class TokenService {
  constructor(
    private readonly configService: ConfigService,
  ) {}

  /**
   * Create a JWT token for the given user ID.
   * @param userId - User ID to create the token for.
   * @returns created JWT token.
   */
  public async create(userId: string): Promise<TokenEntity> {
    const token = await this.generate(userId);

    return TokenEntity.create({ userId, token }).save();
  }


  /**
   * Delete a JWT token for the given user ID.
   * @param userId - User ID to delete the token for.
   * @returns true if the token was deleted, false otherwise.
   */
  public async delete(userId: string): Promise<boolean> {
    const token = await TokenEntity.delete({ userId });

    return !!token.affected && token.affected > 0;
  }

  /**
   * Decode a JWT token.
   * @param token - Token to decode.
   * @returns Decoded token.
   */
  public async decode(token: string): Promise<{ userId: string } | undefined> {
    const tokenEntity = await TokenEntity.findOneBy({
      token,
    });

    let result: { userId: string } | undefined;

    if (tokenEntity) {
      jwt.verify(
        token,
        this.configService.config.jwtToken.secret,
        (error, decoded) => {
          if (decoded && !error && typeof decoded === 'object' && 'userId' in decoded) {
            result = {
              userId: decoded.userId,
            };
          }
        },
      );
    }

    return result;
  }

  /**
   * Generate a JWT token for the given user ID.
   * @param userId - Payload to encode in the token.
   * @returns Encoded JWT token.
   */
  private async generate(userId: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      jwt.sign({ userId }, this.configService.config.jwtToken.secret, {
        expiresIn: this.configService.config.jwtToken.expiresIn,
      }, (error, encoded) => (encoded ? resolve(encoded) : reject(error)));
    });
  }
}
