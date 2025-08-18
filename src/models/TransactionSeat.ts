import { model, Schema } from 'mongoose';

const transactionSeatSchema = new Schema({
  transaction: { type: Schema.Types.ObjectId, ref: 'Transaction' },
  seat: { type: String, required: true },
});

export default model(
  'TransactionSeat',
  transactionSeatSchema,
  'transactionSeats'
);
