import db from '../models';
export async function connectToDB() {
  try {
    await db.sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (e: any) {
    throw new Error(e);
  }
}
