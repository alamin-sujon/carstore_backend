import { Router } from 'express';

import { adminController } from './admin.controller';

const route = Router();

route.get('/', adminController.getAdminData);

export const adminRoute = route;
