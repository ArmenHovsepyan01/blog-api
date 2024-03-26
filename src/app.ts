import express from 'express';

import dotenv from 'dotenv';
dotenv.config();

import path from 'path';

import cors from 'cors';

import router from './routes/router';

import { connectToDB } from './database/config/database';
import bodyParser from 'body-parser';

import { errorHandler } from './middleware/errorHandler';

import 'express-async-errors';

const app = express();
const PORT = process.env.PORT || 5005;
const imagesPath = path.resolve('public/images');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

app.use(errorHandler);

app.use('/api/images', express.static(imagesPath));

const start = async () => {
  try {
    await connectToDB();

    app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));
  } catch (e: any) {
    throw new Error(e);
  }
};

start();
