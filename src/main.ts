import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    }
  }));

  // app.enableVersioning({
  //   type: VersioningType.URI,
  // });

  const config = new DocumentBuilder()
                  .setTitle('NestJS Intro')
                  .setDescription('The NestJS Intro API description')
                  .setTermsOfService('http://swagger.io/terms/')
                  .setLicense('MIT License', 'http://swagger.io/license/')
                  .setVersion('1.0')
                  .addServer('http://localhost:3000', 'Development')
                  .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);


  

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
