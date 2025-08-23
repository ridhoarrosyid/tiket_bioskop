import { model, Schema } from 'mongoose';

const walletTransactionSchema = new Schema({
  wallet: { type: Schema.Types.ObjectId, ref: 'Wallet' },
  price: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'success', 'failed'] },
});

export default model(
  'WalletTransaction',
  walletTransactionSchema,
  'walletTransactions'
);
