import CarModel from '../car/car.model';
import OrderModel from '../order/order.model';
import { User } from '../user/user.model';

const getAdminData = async () => {
  const totalOrder = await OrderModel.estimatedDocumentCount();
  const totalUser = await User.estimatedDocumentCount();
  const totalCar = await CarModel.estimatedDocumentCount();
  const totalRevenu = await OrderModel.aggregate([
    { $project: { totalPrice: 1, quantity: 1 } },
    {
      $group: {
        _id: null,
        price: { $sum: '$totalPrice' },
      },
    },
  ]);
  return {
    totalCar,
    totalOrder,
    totalUser,
    totalRevenu,
  };
};

export const adminServices = {
  getAdminData,
};
