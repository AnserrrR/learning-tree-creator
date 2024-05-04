import { Module } from '@nestjs/common';
import { TokenController } from './token.controller';
import { ConfigService } from './config/config.service';
import { AppEntities } from './common/constants/app.entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from './config/config.module';
import { TokenService } from './token.service';

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
  controllers: [TokenController],
  providers: [TokenService],
})
export class TokenModule {}
