import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { AuthResolver } from './auth.resolver';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { AuthorizationGuard } from './guards/authorization.guard';
import { PermissionGuard } from './guards/permission.guard';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'USER_SERVICE',
      useFactory: (configService: ConfigService) => ClientProxyFactory.create({
        transport: Transport.TCP,
        options: {
          host: configService.config.host,
          port: configService.config.userPort,
        },
      }),
      inject: [ConfigService],
    },
    {
      provide: 'TOKEN_SERVICE',
      useFactory: (configService: ConfigService) => ClientProxyFactory.create({
        transport: Transport.TCP,
        options: {
          host: configService.config.host,
          port: configService.config.tokenPort,
        },
      }),
      inject: [ConfigService],
    },
    {
      provide: 'PERMISSION_SERVICE',
      useFactory: (configService: ConfigService) => ClientProxyFactory.create({
        transport: Transport.TCP,
        options: {
          host: configService.config.host,
          port: configService.config.permissionPort,
        },
      }),
      inject: [ConfigService],
    },
    {
      provide: 'APP_GUARD',
      useClass: AuthorizationGuard,
    },
    {
      provide: 'APP_GUARD',
      useClass: PermissionGuard,
    },
    AuthResolver,
  ],
})
export class AuthModule {}
