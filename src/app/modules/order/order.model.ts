import { model, Schema } from 'mongoose';
import { Orders } from './order.interface';
import CarModel from '../car/car.model';

const orderSchema = new Schema<Orders>(
  {
    email: {
      type: String,
      required: [true, 'Email is required!'],
      validate: {
        validator: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        message: '{VALUE} is not a valid email address!',
      },
    },
    car: {
      type: Schema.Types.ObjectId,
      ref: 'Cars',
      required: [true, 'Car ID is required!'],
      validate: {
        validator: async function (value) {
          const result = await CarModel.exists({ _id: value });
          return result ? true : false;
        },
        message: 'Referenced car does not exist!',
      },
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required!'],
      min: [1, 'Quantity must be at least 1!'],
    },
    totalPrice: {
      type: Number,
      required: [true, 'Total price is required!'],
      min: [0, 'Total price must be a positive number!'],
    },
    transactionId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'canceled'],
      default: 'pending',
    },
  },
  { timestamps: true },
);

const OrderModel = model<Orders>('Orders', orderSchema);
export default OrderModel;
