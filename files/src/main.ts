import { NestFactory } from '@nestjs/core';
import { TcpOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { ConfigService } from './config/config.service';
import { FilesModule } from './files.module';

async function bootstrap() {
  const { config: { port, host, nodeEnv } } = new ConfigService();
  const app = await NestFactory.createMicroservice(FilesModule, {
    transport: Transport.TCP,
    options: {
      host,
      port,
    },
  } as TcpOptions);

  await app.listen();

  const logger = new Logger('Bootstrap');
  logger.log(`Files service successfully launched in ${nodeEnv.toUpperCase()} mode on ${host}:${port}`);
}
bootstrap();
