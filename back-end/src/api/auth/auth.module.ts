import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './services/auth.service';
import { AuthResolver } from './auth.resolver';
import { RemoteAuthService } from './services/remote-auth.service';
import { SportObjectEntity } from '../sport-object/entities/sport-object.entity';
import { UserDocuBackEntity } from '../user/entities/user-docu-back.entity';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ApiTokenResolver } from '../api-token/api-token.resolver';
import { ApiTokenEntity } from '../api-token/api-token.entity';

@Module({
  providers: [
    AuthService,
    AuthResolver,
    RemoteAuthService,
    JwtStrategy,
    ApiTokenResolver,
  ],
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([SportObjectEntity, UserDocuBackEntity, ApiTokenEntity]),
  ],
  exports: [
    AuthService,
  ],
})
export class AuthModule {}
