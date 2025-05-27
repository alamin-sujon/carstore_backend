import { sendResponse } from './../../utils/sendResponse';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { carServices } from './car.service';
import { catchAsync } from '../../utils/catchAsync';

// Create New Car
const createCar = catchAsync(async (req: Request, res: Response) => {
  const carDetails = req.body;
  console.log({ carDetails });
  // const file = req.file;
  // console.log({ file });
  const result = await carServices.createCarToDB(carDetails);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Car created successfully',
    data: result,
  });
});

// Get All Car
const getAllCars = async (req: Request, res: Response) => {
  try {
    const query = req.query;
    const result = await carServices.getAllCarsFromDB(query);
    res.json({
      status: true,
      message: 'Cars retrieved successfully',
      data: result,
    });
  } catch (error: any) {
    res.json({
      status: false,
      message: 'Validation failed',
      error,
      stack: error?.stack,
    });
  }
};

// Get Single Car
const getSingleCar = async (req: Request, res: Response) => {
  try {
    const { carId } = req.params;
    const result = await carServices.getSignleCarFromDB(carId);
    res.json({
      status: true,
      message: 'Car retrieved successfully',
      data: result,
    });
  } catch (error: any) {
    res.json({
      status: false,
      message: 'Validation failed',
      error,
      stack: error?.stack,
    });
  }
};

// Update a Car
const updateSingleCar = async (req: Request, res: Response) => {
  try {
    const { carId } = req.params;
    const updatedDetails = req.body;
    const result = await carServices.updateSingleCarFromDB(
      carId,
      updatedDetails,
    );
    res.json({
      status: true,
      message: 'Car updated successfully',
      data: result,
    });
  } catch (error: any) {
    res.json({
      status: false,
      message: 'Validation failed',
      error: error,
      stack: error?.stack,
    });
  }
};

// Delete A Car
const deleteCar = async (req: Request, res: Response) => {
  try {
    const { carId } = req.params;
    // console.log({ carId });
    const result = await carServices.deleteCarFromDB(carId);
    console.log(result);
    res.json({
      status: true,
      message: 'Car deleted successfully',
      data: result,
    });
  } catch (error: any) {
    res.json({
      status: false,
      message: 'Validation failed',
      error,
      stack: error?.stack,
    });
  }
};

export const carControllers = {
  createCar,
  getAllCars,
  getSingleCar,
  deleteCar,
  updateSingleCar,
};
