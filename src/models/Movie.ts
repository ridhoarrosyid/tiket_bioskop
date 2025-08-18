import { model, Schema } from 'mongoose';
import { getAccessUrl } from '../utils/helper';
import Genre from './Genre';
import Theater from './Theater';

const movieSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    genre: {
      type: Schema.Types.ObjectId,
      ref: 'Genre',
    },
    theaters: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Theater',
      },
    ],
    description: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      require: true,
    },
    price: Number,
    available: Boolean,
    bonus: String,
  },
  {
    virtuals: {
      thumbnailUrl: {
        get() {
          return `${getAccessUrl()}${this.thumbnail}`;
        },
      },
    },
    toJSON: {
      virtuals: true,
    },
  }
);

movieSchema.post('save', async (doc) => {
  if (doc) {
    await Genre.findByIdAndUpdate(doc.genre, {
      $push: {
        movies: doc._id,
      },
    });

    for (const theater of doc.theaters) {
      await Theater.findByIdAndUpdate(theater, {
        $push: {
          movies: doc._id, //kayaknya doc._id deh
        },
      });
    }
  }
});

movieSchema.post('findOneAndDelete', async (doc) => {
  if (doc) {
    await Genre.findByIdAndUpdate(doc.genre, {
      $pull: {
        movies: doc._id,
      },
    });

    for (const theater of doc.theaters) {
      await Theater.findByIdAndUpdate(theater, {
        $pull: {
          movies: doc._id, //kayaknya doc._id deh
        },
      });
    }
  }
});

export default model('Movie', movieSchema, 'movies');
