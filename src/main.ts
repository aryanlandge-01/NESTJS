import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { config } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

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

  const swaggerconfig = new DocumentBuilder()
                  .setTitle('NestJS Intro')
                  .setDescription('The NestJS Intro API description')
                  .setTermsOfService('http://swagger.io/terms/')
                  .setLicense('MIT License', 'http://swagger.io/license/')
                  .setVersion('1.0')
                  .addServer('http://localhost:3000', 'Development')
                  .build();

  const document = SwaggerModule.createDocument(app, swaggerconfig);

  SwaggerModule.setup('api', app, document);

  // Setup the aws sdk used uploading the files to aws s3 bucket.
  const configService = app.get(ConfigService);
  config.update({
    credentials: {
      accessKeyId: configService.get('appConfig.awsAccessKeyId'),
      secretAccessKey:configService.get('appConfig.awsSecretAccessKey'),
    },
    region: configService.get('appConfig.awsRegion')
  })
  
  // enable cors
  app.enableCors();


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
