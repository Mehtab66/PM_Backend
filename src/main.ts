import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder,SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config=new DocumentBuilder()
  .setTitle("Agency Api")
  .setDescription('Api documentation for creating and logging in agency')
  .addServer('http://localhost:3000','Local Server')
  .build()
  const document=SwaggerModule.createDocument(app,config)
  SwaggerModule.setup('api-docs',app,document)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
