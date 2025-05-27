/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from 'jsonwebtoken';
type TPayload = {
  email: string;
  role: string;
};
export const generateToken = async (
  payload: TPayload,
  secret: string,
  expiresIn: any,
) => {
  const token = jwt.sign(payload, secret, { expiresIn: expiresIn });
  return token;
};
