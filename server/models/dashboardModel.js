import { Schema, model } from 'mongoose';
import { renameIdTransform } from '../utils/formatMongoData.js';

const DashboardSchema = new Schema(
  {
    main: {
      type: String,
      default: 'main',
      unique: true,
    },
    goals: {
      newCustomers: {
        7: {
          type: Number,
          required: true,
          min: 0,
          default: 5,
        },
        30: {
          type: Number,
          required: true,
          min: 0,
          default: 20,
        },
        365: {
          type: Number,
          required: true,
          min: 0,
          default: 200,
        },
      },
      orders: {
        7: {
          type: Number,
          required: true,
          min: 0,
          default: 10,
        },
        30: {
          type: Number,
          required: true,
          min: 0,
          default: 40,
        },
        365: {
          type: Number,
          required: true,
          min: 0,
          default: 500,
        },
      },
      revenue: {
        7: {
          type: Number,
          required: true,
          min: 0,
          default: 5000,
        },
        30: {
          type: Number,
          required: true,
          min: 0,
          default: 20000,
        },
        365: {
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
