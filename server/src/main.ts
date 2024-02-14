import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.API_LOCAL_PORT;
  console.log(port);
  await app.listen(port);

}
bootstrap();
