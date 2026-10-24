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
          default: 5,
        },
        'days-30': {
          type: Number,
          required: true,
          min: 0,
          default: 20,
        },
        year: {
          type: Number,
          required: true,
          min: 0,
          default: 200,
        },
      },
      orders: {
        'days-7': {
          type: Number,
          required: true,
          min: 0,
          default: 10,
        },
        'days-30': {
          type: Number,
          required: true,
          min: 0,
          default: 40,
        },
        year: {
          type: Number,
          required: true,
          min: 0,
          default: 500,
        },
      },
      revenue: {
        'days-7': {
          type: Number,
          required: true,
          min: 0,
          default: 5000,
        },
        'days-30': {
          type: Number,
          required: true,
          min: 0,
          default: 20000,
        },
        year: {
          type: Number,
          required: true,
          min: 0,
          default: 250000,
        },
      },
    },
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
