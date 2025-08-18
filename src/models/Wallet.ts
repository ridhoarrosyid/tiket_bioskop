import { model, Schema } from 'mongoose';

const walletSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  balance: { type: Number, default: 0, required: true },
});

export default model('Wallet', walletSchema, 'wallets');
