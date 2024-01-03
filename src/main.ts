import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    cookieSession({
      keys: ['toovii250'],
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: false,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('TooVii Swagger')
    .setDescription('Full Documentation  of Toovii backend using NestJs')
    .setVersion('1.0')
    .addTag('Routes')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
