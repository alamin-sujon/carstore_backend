/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { orderServices } from './order.service';
import CarModel from '../car/car.model';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';

const createOrder = async (req: Request, res: Response): Promise<any> => {
  try {
    const order = req.body;
    const isCarExist = await CarModel.findById(order.car);

    if (!isCarExist) {
      return res.status(404).json({
        message: 'Something went wrong',
        status: false,
        error: {
          message: 'Car is not founded!!!',
        },
      });
    }
    if (!isCarExist.inStock) {
      return res.status(404).json({
        message: 'Out of Stock',
        status: false,
        error: {
          message: 'Car is out of stock!!!',
        },
      });
    }
    if (isCarExist.quantity < order.quantity) {
      return res.status(404).json({
        message: 'Something went wrong',
        status: false,
        error: {
          message: `Insufficient Car! ${isCarExist.quantity} cars are available`,
        },
      });
    }
    const inStock = isCarExist.quantity - order.quantity > 0;

    const updatedResult = await CarModel.findByIdAndUpdate(
      order.car,
      {
        $set: {
          quantity: isCarExist.quantity - order.quantity,
          inStock,
        },
      },
      {
        new: true,
        runValidators: true,
      },
    );
    const result = await orderServices.createOrderToDB(order);
    console.log(updatedResult);

    return res.status(200).json({
      message: 'Order created successfully',
      status: true,
      data: result,
    });
  } catch (error: any) {
    return res.status(404).json({
      message: 'Something went wrong',
      status: false,
      error,
      stack: error?.stack,
    });
  }
};

const getAllOrder = async (req: Request, res: Response) => {
  try {
    const result = await orderServices.getAllOrdersFromDB();
    res.json({
      status: true,
      message: 'Order retrived successfully',
      data: result,
    });
  } catch (error) {
    res.json({
      status: true,
      message: 'Something went wrong',
      error,
    });
  }
};
const getUserOrder = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.params;
  const result = await orderServices.getUserOrder(email);
  res.json({
    status: true,
    message: 'Order retrived successfully',
    data: result,
  });
});
const updateOrder = catchAsync(async (req: Request, res: Response) => {
  const { orderId } = req.params;
  const payload = req.body;
  const result = await orderServices.updateOrder(orderId, payload);
  res.json({
    status: true,
    message: 'Order updated successfully',
    data: result,
  });
});

const calculateRevenue = async (req: Request, res: Response) => {
  try {
    const result = await orderServices.calculateRevenueFromDB();
    res.json({
      message: 'Revenue calculated successfully',
      status: true,
      data: result[0],
    });
  } catch (error: any) {
    res.status(200).json({
      message: 'Something went wrong',
      status: true,
      error,
      stack: error?.stack,
    });
  }
};

const getClientSecret = catchAsync(async (req, res) => {
  const payload = req.body;
  // const result = ;
  const result = await orderServices.getClientSecret(payload);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'client sceret retrived successfully',
    data: result,
  });
});

export const orderControllers = {
  createOrder,
  calculateRevenue,
  getAllOrder,
  updateOrder,
  getClientSecret,
  getUserOrder,
};
