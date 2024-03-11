import express from 'express';

import cors from 'cors';

import router from './routes/router';

import { connectToDB } from './database/config/database';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 5005;
const imagesPath = path.resolve('public/images');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

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
