import mongoose from 'mongoose';
import app from './app';
import { config } from './app/config';
// import config from "./app/config";

const main = async () => {
  try {
    await mongoose.connect(config.db_url as string);
    app.listen(config.port, () => {
      console.log('Server is Running at : ', config.port);
    });
  } catch (error) {
    console.log(error);
  }
};

main();
