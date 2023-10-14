import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PixKeyGrpcUnknownErrorFilter } from './pix-keys/filters/pix-key-grpc-unknown-error.filter';
import { PixKeyAlreadyExistsErrorFilter } from './pix-keys/filters/pix-key-already-exists.error';
import { ValidationPipe } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(
    new PixKeyGrpcUnknownErrorFilter(),
    new PixKeyAlreadyExistsErrorFilter(),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422,
    }),
  );

  const configService = app.get(ConfigService);

  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: [configService.get('KAFKA_BROKER')],
      },
      consumer: {
        groupId: configService.get('KAFKA_CONSUMER_GROUP_ID'),
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
