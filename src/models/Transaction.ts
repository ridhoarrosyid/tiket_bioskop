import { model, Schema } from 'mongoose';

const transactionSchema = new Schema(
  {
    subTotal: { type: Number, required: true, default: 0 },
    total: { type: Number, required: true, default: 0 },
    bookingFee: { type: Number, required: true, default: 0 },
    tax: { type: Number, required: true, default: 0 },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    movie: {
      type: Schema.Types.ObjectId,
      ref: 'Movie',
    },
    theater: {
      type: Schema.Types.ObjectId,
      ref: 'Theater',
    },
    date: { type: String, required: true },
  },
  { timestamps: true }
);

export default model('Transaction', transactionSchema, 'transactions');
