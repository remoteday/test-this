import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());


  app.enableShutdownHooks()
  app.enableCors({ origin: "*" })

  const options = new DocumentBuilder()
    .setTitle('Remote Day API')
    .setDescription('Remote Day API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  const configService = app.get(ConfigService);

  await app.listen(configService.get<number>("SERVER_PORT"), () => {
    console.log(`listening on http://localhost:${configService.get<number>("SERVER_PORT")}`)
  });
}
bootstrap();
