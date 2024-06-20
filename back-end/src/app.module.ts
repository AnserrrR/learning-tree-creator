import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from './config/config.module';
import { TreeModule } from './tree/tree.module';
import { ConfigService } from './config/config.service';
import { AppEntities } from './app.entities';
import { SectionModule } from './section/section.module';

@Module({
  imports: [
    ConfigModule,
    TreeModule,
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        ...configService.config.database,
        entities: AppEntities,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
