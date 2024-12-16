import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { seedTestCrudDb } from './db/seed';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  await seedTestCrudDb();
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
