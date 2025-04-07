import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SeedService } from './common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .setTitle('Nest')
    .setDescription('Nest swagger')
    .setVersion('1.0')
    .addCookieAuth(
      'accessToken',
      {
        type: 'http',
        in: 'Header',
        scheme: 'Bearer',
      },
      'Access Token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const seedService = app.get(SeedService);
  await seedService.seed();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
