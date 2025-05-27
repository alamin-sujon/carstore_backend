/* eslint-disable @typescript-eslint/no-explicit-any */
import { stripe } from '../../../app';
import { Orders } from './order.interface';
import OrderModel from './order.model';

const createOrderToDB = async (data: Orders) => {
  const result = await OrderModel.create(data);

  return result;
};

const calculateRevenueFromDB = async () => {
  const result = OrderModel.aggregate([
    {
      $group: {
        _id: null,
        totalPrice: {
          $sum: '$totalPrice',
          // $sum: {
          //   $multiply: ['$totalPrice', '$quantity'],
          // },
        },
      },
    },
    {
      $project: {
        _id: 0,
        totalPrice: 1,
      },
    },
  ]);
  return result;
};

const getAllOrdersFromDB = async () => {
  const result = await OrderModel.find({}).populate('car');
  return result;
};

const updateOrder = async (id: string, payload: Partial<Orders>) => {
  const result = await OrderModel.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const getClientSecret = async (payload: any) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round((payload?.amount as number) * 100), // Stripe expects amounts in cents
    currency: 'usd',
    metadata: {
      brand: payload?.brand as string,
      model: payload?.model as string,
      category: payload?.category as string,
      totalPrice: payload?.totalPrice,
    },
  });

  console.log('cl ', paymentIntent.client_secret);
  return paymentIntent.client_secret;
};

const getUserOrder = async (email: string) => {
  const result = await OrderModel.find({ email }).populate('car');
  return result;
};

export const orderServices = {
  createOrderToDB,
  calculateRevenueFromDB,
  getAllOrdersFromDB,
  updateOrder,
  getClientSecret,
  getUserOrder,
};
