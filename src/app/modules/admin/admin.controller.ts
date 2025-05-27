import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { adminServices } from './admin.service';

const getAdminData = catchAsync(async (req, res) => {
  const result = await adminServices.getAdminData();
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: ' admin data retrived successfully',
    data: result,
  });
});

export const adminController = {
  getAdminData,
};
