import { Module } from '@nestjs/common';
import { TreeResolver } from './tree.resolver';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  imports: [ConfigModule],
  providers: [
    TreeResolver,
    {
      provide: 'BACK_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.config.host,
            port: configService.config.backPort,
          },
        });
      },
      inject: [ConfigService],
    }
  ]
})
export class BackModule {}
