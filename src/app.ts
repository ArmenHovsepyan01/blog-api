import express from 'express';
import router from './routes/router';
import cors from 'cors';
import { connectToDB } from './database/config/database';

const app = express();
const PORT = process.env.PORT || 5005;

app.use(cors());
app.use(express.json());
app.use(router);

const start = async () => {
  try {
    await connectToDB();
    app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));
  } catch (e: any) {
    throw new Error(e);
  }
};

start();
