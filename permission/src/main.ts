import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { TcpOptions, Transport } from '@nestjs/microservices';
import { PermissionModule } from './permission.module';
import { ConfigService } from './config/config.service';

async function bootstrap() {
  const { config: { port, host, nodeEnv } } = new ConfigService();
  const app = await NestFactory.createMicroservice(PermissionModule, {
    transport: Transport.TCP,
    options: {
      host,
      port,
    },
  } as TcpOptions);

  await app.listen();

  const logger = new Logger('Bootstrap');
  logger.log(`Permission service successfully launched in ${nodeEnv.toUpperCase()} mode on ${host}:${port}`);
}
bootstrap();
