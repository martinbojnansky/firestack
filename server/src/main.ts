import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { Express } from 'express-serve-static-core';
import { initializeApp } from 'firebase-admin/app';
import * as functions from 'firebase-functions';
import { AppModule } from './app.module';

require('dotenv').config();

const server = express();

async function bootstrap(expressInstance: Express): Promise<INestApplication> {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
    { cors: true },
  );
  initializeApp({
    /*TODO*/
  });
  return await app.init();
}
bootstrap(server);

export const api = functions.https.onRequest(server);
