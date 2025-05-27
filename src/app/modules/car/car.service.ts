/* eslint-disable @typescript-eslint/no-explicit-any */
import QueryBuilder from '../../builder/QueryBuilder';
import { Car } from './car.interface';
import CarModel from './car.model';

const createCarToDB = async (car: Car) => {
  const result = await CarModel.create(car);
  return result;
};

// Get All Car Service
const getAllCarsFromDB = async (query: Record<string, unknown>) => {
  console.log(query);
  const carQuery = new QueryBuilder(CarModel.find(), query)
    .search(['model', 'brand', 'category'])
    .price()
    .filter()
    .sort();
  // .paginate();
  const result = await carQuery.modelQuery;
  return result;
};

// Get Single Car Service
const getSignleCarFromDB = async (id: string) => {
  const result = await CarModel.findById(id);
  return result;
};

// Update a Car
const updateSingleCarFromDB = async (id: string, obj: object) => {
  await CarModel.updateOne(
    { _id: id },
    { ...obj },
    { new: true, runValidators: true },
  );
  const result = await CarModel.findById(id);
  return result;
};

// Delete A Car Service
const deleteCarFromDB = async (id: string) => {
  const result = await CarModel.deleteOne({ _id: id });
  return result;
};

export const carServices = {
  createCarToDB,
  getAllCarsFromDB,
  getSignleCarFromDB,
  deleteCarFromDB,
  updateSingleCarFromDB,
};
