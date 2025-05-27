import express from 'express';
import { orderControllers } from './order.controller';

const route = express.Router();

route.get('/', orderControllers.getAllOrder);
route.get('/:email', orderControllers.getUserOrder);
route.post('/client-secret', orderControllers.getClientSecret);
route.get('/revenue', orderControllers.calculateRevenue);
route.put('/:orderId', orderControllers.updateOrder);
route.post('/', orderControllers.createOrder);

export const orderRoute = route;
