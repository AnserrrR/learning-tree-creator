import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { config: { port, nodeEnv } } = await app.resolve(ConfigService);

  app.enableCors({
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    origin: true,
    credentials: true,
  });
  await app.listen(port);

  const logger = new Logger('Bootstrap');
  logger.log(`App successfully launched in ${nodeEnv.toUpperCase()} mode on port ${port}`);
}
bootstrap();
