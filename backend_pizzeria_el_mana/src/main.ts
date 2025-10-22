import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });
  app.enableCors();

    const config = new DocumentBuilder()
    .setTitle('API Rest labPizzeria SIS257')
    .setDescription('API REST SIS257 Laboratorio')
    .setVersion('1.0')
    .addTag('categorias,clientes,empleados,productos,usuarios')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('apidoc', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
  console.log(`App corriendo en: ${await app.getUrl()}`);
}
bootstrap();
