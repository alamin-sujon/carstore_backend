import express from 'express';
import { carControllers } from './car.controller';

import { auth } from '../../middleware/auth';

const route = express.Router();

route.get('/', carControllers.getAllCars);
route.get('/:carId', carControllers.getSingleCar);
route.put('/:carId', carControllers.updateSingleCar);
route.post(
  '/',
  // upload.single('file'),
  // (req, res, next) => {
  //   req.body = JSON.parse(req.body.data);
  //   next();
  // },
  auth('admin'),
  carControllers.createCar,
);
route.delete('/:carId', auth('admin'), carControllers.deleteCar);

export const carRoute = route;
