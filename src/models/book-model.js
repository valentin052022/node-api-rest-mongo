import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  publication: String,
});

const Book = mongoose.model('Book', bookSchema);

export { Book };
