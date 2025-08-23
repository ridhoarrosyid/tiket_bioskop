import { model, Schema } from 'mongoose';
import { getAccessUrl } from '../utils/helper';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    photo: { type: String, required: true },
    role: { type: String, enum: ['admin', 'customer'], default: 'customer' },
  },
  {
    virtuals: {
      photoUrl: {
        get() {
          return `${getAccessUrl('photo')}${this.photo}`;
        },
      },
    },
    toJSON: {
      virtuals: true,
    },
  }
);

export default model('User', userSchema, 'users');
