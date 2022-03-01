import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as express from 'express';
import * as functions from 'firebase-functions';
import { Express } from 'express-serve-static-core';
import { INestApplication } from '@nestjs/common';

const server = express();

async function bootstrap(expressInstance: Express): Promise<INestApplication> {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
    { cors: true },
  );
  return await app.init();
}
bootstrap(server);

export const api = functions.https.onRequest(server);
