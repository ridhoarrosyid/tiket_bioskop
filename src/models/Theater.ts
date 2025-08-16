import { model, Schema } from 'mongoose';

const theaterSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    city: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

export default model('Theater', theaterSchema, 'theaters');
