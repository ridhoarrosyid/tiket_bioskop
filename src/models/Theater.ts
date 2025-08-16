import { model, Schema } from 'mongoose';

const theaterSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model('Theater', theaterSchema, 'theaters');
