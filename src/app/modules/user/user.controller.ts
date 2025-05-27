import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { userServices } from './user.service';

const registerUser = catchAsync(async (req, res) => {
  const payload = req.body;
  const result = await userServices.registerUser(payload);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User register successfully',
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await userServices.loginUser(req.body);
  res.cookie('refreshToken', result?.refreshToken);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User login successfully',
    data: result?.accessToken,
  });
});
const changePassword = catchAsync(async (req, res) => {
  const result = await userServices.changePassword(req?.user, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User password updated successfully',
    data: result,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const result = await userServices.refreshToken(req?.cookies?.refreshToken);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'generate access token',
    data: result,
  });
});

const getAlluser = catchAsync(async (req, res) => {
  const result = await userServices.getAllUser();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'users retrived successfully',
    data: result,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await userServices.getSingleUser(userId);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'user retrived successfully',
    data: result,
  });
});
const updateUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const payload = req.body;
  console.log({ userId, payload });
  const result = await userServices.updateUser(userId, payload);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'user updated successfully',
    data: result,
  });
});
const getMe = catchAsync(async (req, res) => {
  const { userId } = req.params;

  const result = await userServices.getMe(userId);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'user retrived successfully',
    data: result,
  });
});

export const userControllers = {
  registerUser,
  loginUser,
  changePassword,
  refreshToken,
  getAlluser,
  updateUser,
  getSingleUser,
  getMe,
};
