import mongoose from 'mongoose';

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishYear: {
      type: Number,
      required: false,
    },
    price:{
      type: Number,
      required: true
    },
    genre:{
      type: Array,
      default: ["crime"],
      required: true
    },
    image:{
      type: String,
      required: true
    },
    description:{
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

export const Book = mongoose.model('Book', bookSchema);