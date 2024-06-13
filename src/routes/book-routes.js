import express from "express";
import { Book } from "../models/book-model.js";

export const routes = express.Router();

// MIDDLEWARE

const getBook = async (req, res, next) => {
  let book;
  const { id } = req.params;

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(404).json({ message: "El id del libro no es válido" });
  }

  try {
    book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Error libro no encontrado" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.book = book;
  next();
};

// Obtener todos los libros
routes.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    if (books.length === 0) {
      res.status(204).json([]);
    }
    res.json(books);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Crear un libro
routes.post("/", async (req, res) => {
  const { title, author, genre, publication } = req.body;

  if (!title || !author || !genre || !publication) {
    return res.status(400).json({
      message: "Los campos title, author, genre, publication son obligatorios",
    });
  }

  const book = new Book({
    title,
    author,
    genre,
    publication,
  });

  try {
    const newBook = await book.save();
    return res.status(201).json(newBook);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

routes.get("/:id", getBook, async (req, res) => {
  res.json(res.book);
});

routes.put("/:id", getBook, async (req, res) => {
  try {
    const book = res.book;
    book.title = req.body.title || book.title;
    book.author = req.body.author || book.author;
    book.genre = req.body.genre || book.genre;
    book.publication = req.body.publication || book.publication;

    const updateBook = await book.save();
    res.json(updateBook);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

routes.patch("/:id", getBook, async (req, res) => {
  if (
    !req.body.title &&
    !req.body.author &&
    !req.body.genre &&
    !req.body.publication
  ) {
    res.json({
      message:
        "Al menos unos de los campos; Titulo, Autor, Genero, Publicacion. Debe ser enviado.",
    });
  }

  try {
    const book = res.book;
    book.title = req.body.title || book.title;
    book.author = req.body.author || book.author;
    book.genre = req.body.genre || book.genre;
    book.publication = req.body.publication || book.publication;

    const updateBook = await book.save();
    res.json(updateBook);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

routes.patch("/:id", getBook, async (req, res) => {
  if (
    !req.body.title &&
    !req.body.author &&
    !req.body.genre &&
    !req.body.publication
  ) {
    res.json({
      message:
        "Al menos unos de los campos; Titulo, Autor, Genero, Publicacion. Debe ser enviado.",
    });
  }

  try {
    const book = res.book;
    book.title = req.body.title || book.title;
    book.author = req.body.author || book.author;
    book.genre = req.body.genre || book.genre;
    book.publication = req.body.publication || book.publication;

    const updateBook = await book.save();
    res.json(updateBook);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

routes.delete("/:id", getBook, async (req, res) => {
  try {
    const book = res.book
    await book.deleteOne({
      _id: book._id
    });
    res.json({message: `El libro ${book.title} ha sido eliminado con exito`})
  } catch (error) {
    res.status(500).json({message: `NO SE HA PODIDO ELIMINAR EL LIBRO: ${error.message}`})
  }
});
