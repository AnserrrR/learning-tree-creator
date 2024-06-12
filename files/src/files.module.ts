import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { AppEntities } from './app.entities';
import { FilesController } from './controllers/files.controller';
import { ImageController } from './controllers/image.controller';
import { ImageService } from './services/image.service';
import { FilesService } from './services/files.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        ...configService.config.database,
        entities: AppEntities,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    ConfigModule,
  ],
  controllers: [
    FilesController,
    ImageController,
  ],
  providers: [
    ImageService,
    FilesService,
  ],
})
export class FilesModule {}
