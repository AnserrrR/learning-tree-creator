import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';

@Module({
  imports: [ConfigModule],
  controllers: [
    // FilesController,
    // ImageController,
  ],
  providers: [
    {
      provide: 'FILES_SERVICE',
      useFactory: (configService: ConfigService) => ClientProxyFactory.create({
        transport: Transport.TCP,
        options: {
          host: configService.config.host,
          port: configService.config.filesPort,
        },
      }),
      inject: [ConfigService],
    },
  ],
})
export class FilesModule {}
