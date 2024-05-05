import mongoose from "mongoose";

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
      required: true,
    },
  },
  // in order to have time of creation and time of update we need timestamps
  {
    timestamps : true, 
  }
)

export const Book = mongoose.model('Cat',bookSchema)