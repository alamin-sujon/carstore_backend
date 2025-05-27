import jwt, { JwtPayload } from 'jsonwebtoken';
import AppError from '../error/AppError';
import { catchAsync } from '../utils/catchAsync';
import { config } from '../config';
import { User } from '../modules/user/user.model';

export type TRole = 'admin' | 'user';

export const auth = (...roles: TRole[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers?.authorization;
    if (!token) {
      throw new AppError(405, 'UnAuthorize access!!!');
    }
    const decoded = jwt.verify(
      token,
      config.access_token_secret as string,
    ) as JwtPayload;
    if (!roles.includes(decoded?.role)) {
      throw new AppError(403, 'Unauthorized access');
    }
    const isUserExist = await User.findOne({ email: decoded?.email });
    if (!isUserExist) {
      throw new AppError(404, 'User not found');
    }
    if (isUserExist?.status === 'blocked') {
      throw new AppError(409, 'This user is blocked');
    }

    req.user = decoded;
    next();
  });
};
