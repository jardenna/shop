import { Schema, model } from 'mongoose';
import { renameIdTransform } from '../utils/formatMongoData.js';

const DashboardSchema = new Schema(
  {
    goals: {
      newCustomers: {
        'days-7': {
          type: Number,
          required: true,
          min: 0,
        },
        'days-30': {
          type: Number,
          required: true,
          min: 0,
        },
        year: {
          type: Number,
          required: true,
          min: 0,
        },
      },
      orders: {
        'days-7': {
          type: Number,
          required: true,
          min: 0,
        },
        'days-30': {
          type: Number,
          required: true,
          min: 0,
        },
        year: {
          type: Number,
          required: true,
          min: 0,
        },
      },
      revenue: {
        'days-7': {
          type: Number,
          required: true,
          min: 0,
        },
        'days-30': {
          type: Number,
          required: true,
          min: 0,
        },
        year: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    },
    newProducts: {
      productName: { type: String, required: true },
      image: { type: String, required: true },
    },
    mostSellingProducts: {
      productName: { type: String, required: true },
      image: { type: String, required: true },
      salesNumber: {
        type: Number,
        required: true,
      },
    },
    recentOrders: {},
    deliveryStatus: {},
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: renameIdTransform,
    },
    toObject: {
      virtuals: true,
    },
  },
);

const Dashboard = model('Dashboard', DashboardSchema);

export default Dashboard;

// -mangler afsendelse  alt minus levering og afsendt
// - annullerede order
// ordre qty
