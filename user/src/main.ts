import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { TcpOptions, Transport } from '@nestjs/microservices';
import { UserModule } from './user.module';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const { config: { host, port, nodeEnv } } = new ConfigService();
  const app = await NestFactory.createMicroservice(UserModule, {
    transport: Transport.TCP,
    options: {
      host,
      port,
    },
  } as TcpOptions);

  await app.listen();

  const logger = new Logger('Bootstrap');
  logger.log(`User service successfully launched in ${nodeEnv.toUpperCase()} mode on ${host}:${port}`);
}
bootstrap();
