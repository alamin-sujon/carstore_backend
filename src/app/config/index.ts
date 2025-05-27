import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });

export const config = {
  port: process.env.PORT,
  db_url: process.env.DB_URL,
  NODE_ENV: process.env.NODE_ENV,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  refrest_token_secret: process.env.REFREST_TOKEN_SECRET,
  access_token_expire_date: process.env.ACCESS_TOKEN_EXPIRE_DATE,
  refresh_token_expire_date: process.env.REFREST_TOKEN_EXPIRE_DATE,
  cloudnary_api: process.env.CLOUDINARY_API,
  stripe_secret: process.env.STRIPE_SECRET,
};
