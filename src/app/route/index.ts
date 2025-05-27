import { Router } from 'express';
import { carRoute } from '../modules/car/car.route';
import { orderRoute } from '../modules/order/order.route';
import { userRoute } from '../modules/user/user.route';
import { adminRoute } from '../modules/admin/admin.route';
const route = Router();

const modules = [
  { path: '/cars', route: carRoute },
  { path: '/orders', route: orderRoute },
  { path: '/auth', route: userRoute },
  { path: '/admin', route: adminRoute },
];

modules.forEach((el) => route.use(el.path, el.route));

export default route;
