import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { TreeResolver } from './tree.resolver';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';

@Module({
  imports: [ConfigModule],
  providers: [
    TreeResolver,
    {
      provide: 'BACK_SERVICE',
      useFactory: (configService: ConfigService) => ClientProxyFactory.create({
        transport: Transport.TCP,
        options: {
          host: configService.config.host,
          port: configService.config.backPort,
        },
      }),
      inject: [ConfigService],
    },
  ],
})
export class TreeModule {}
