import { hashPassword } from './../../utils/hashPassword';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from '../../config';
import AppError from '../../error/AppError';
import { comparePassword } from '../../utils/comparePassword';
import { generateToken } from '../../utils/generateToken';

import { TLoginUser, TPasswordChange, TUser } from './user.interface';
import { User } from './user.model';

const registerUser = async (payload: TUser) => {
  const isUserExist = await User.findOne({ email: payload.email });
  if (isUserExist) {
    throw new AppError(409, 'User already exists with this email');
  }
  payload.password = await hashPassword(payload.password);
  const result = await User.create(payload);
  return result;
};

const loginUser = async (payload: TLoginUser) => {
  const isUserExist = await User.findOne({ email: payload?.email });
  if (!isUserExist) {
    throw new AppError(404, 'User not found!!!');
  }
  const isPasswordSame = await comparePassword(
    payload?.password,
    isUserExist?.password,
  );

  if (!isPasswordSame) {
    throw new AppError(403, 'Incorrect Password');
  }
  const payloadData = {
    id: isUserExist?._id,
    email: isUserExist?.email,
    role: isUserExist?.role,
  };
  const accessToken = await generateToken(
    payloadData,
    config.access_token_secret as string,
    config.access_token_expire_date as string,
  );
  const refreshToken = await generateToken(
    payloadData,
    config.refrest_token_secret as string,
    config.refresh_token_expire_date,
  );

  return {
    accessToken,
    refreshToken,
  };
};

const changePassword = async (
  decoded: JwtPayload,
  payload: TPasswordChange,
) => {
  console.log({ decoded, payload });
  const isUserExist = await User.findOne({ email: decoded?.email });
  const isPasswordSame = await comparePassword(
    payload?.password,
    isUserExist?.password as string,
  );
  if (!isPasswordSame) {
    throw new AppError(409, 'Wrong current password');
  }
  console.log({ isPasswordSame, payload });
  const hashedPassword = await hashPassword(payload?.newPassword);
  const result = await User.findOneAndUpdate(
    { email: decoded?.email },
    { password: hashedPassword },
    { new: true },
  );
  return result;
};

const refreshToken = async (token: string) => {
  if (!token) {
    throw new AppError(404, 'Token not found');
  }
  const decoded = jwt.verify(token, config.refrest_token_secret as string);
  const isUserExist = await User.findOne({
    email: (decoded as JwtPayload)?.email,
  });
  if (!isUserExist) {
    throw new AppError(404, 'User not found');
  }
  const jwtPayload = {
    email: isUserExist?.email,
    role: isUserExist?.role,
  };

  const accessToken = await generateToken(
    jwtPayload,
    config.access_token_secret as string,
    config.access_token_expire_date,
  );

  return { accessToken };
};

const getAllUser = async () => {
  const result = await User.find({});
  return result;
};

const getSingleUser = async (id: string) => {
  const result = await User.findById(id);
  return result;
};

const updateUser = async (id: string, payload: Partial<TUser>) => {
  const result = await User.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const getMe = async (id: string) => {
  const result = await User.findById(id).select('-password');
  return result;
};

export const userServices = {
  registerUser,
  loginUser,
  changePassword,
  refreshToken,
  getAllUser,
  getSingleUser,
  updateUser,
  getMe,
};
