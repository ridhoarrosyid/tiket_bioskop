import { model, Schema } from 'mongoose';

const genreSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    movies: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Movie',
      },
    ],
  },
  { timestamps: true }
);

export default model('Genre', genreSchema, 'genres');
