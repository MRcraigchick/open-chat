#!/usr/bin/env node
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });
import debug from 'debug';
debug('backend:server');
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import logger from 'morgan';
import chalk from 'chalk';
import { userRouter } from '@/routes';
import connectToDatabase from '@/db/mongo_db_connector';

const PORT = process.env.PORT || '8000';
const app = express();

connectToDatabase().catch((err) => console.log(err));

// EXPRESS MIDDLEWARE CONFIG
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors());

// EXPRESS ROUTERS
app.use('/user', userRouter);

// PORT LISTENER
app.listen(PORT, () => {
  console.log(`
${chalk.cyanBright('SERVER LISTENING ON PORT:')} ${chalk.whiteBright(PORT)}
`);
});
