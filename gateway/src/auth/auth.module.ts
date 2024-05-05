import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { AuthorizationGuard } from './guards/authorization.guard';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'USER_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.config.host,
            port: configService.config.userPort,
          },
        });
      },
      inject: [ConfigService],
    },
    {
      provide: 'TOKEN_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.config.host,
            port: configService.config.tokenPort,
          },
        });
      },
      inject: [ConfigService],
    },
    {
      provide: 'APP_GUARD',
      useClass: AuthorizationGuard,
    },
    AuthResolver,
  ],
})
export class AuthModule {}
