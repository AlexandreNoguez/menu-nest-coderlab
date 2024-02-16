import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.API_LOCAL_PORT || 3333;

  app.enableCors(); // I'll let cors open to make easier to test

  await app.listen(port, () => {
    console.log(`Server started at port ${port} ${new Date().toLocaleString("pt-br")}`);
  });

}
bootstrap();
