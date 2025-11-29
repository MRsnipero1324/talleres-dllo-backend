import { db } from "../utils/db.js";

// CREATE (solo permisos)
export function createBook(req, res) {
  if (!req.user.permissions.create_books)
    return res.status(403).json({ error: "No autorizado" });

  const book = {
    id: db.books.length + 1,
    ...req.body,
    deleted: false,
    reserved_by: [],
  };

  db.books.push(book);
  res.json({ msg: "Libro creado", book });
}

// READ 1 libro
export function getBook(req, res) {
  const book = db.books.find(b => b.id == req.params.id && !b.deleted);
  if (!book) return res.status(404).json({ error: "Libro no encontrado" });

  res.json(book);
}

// READ * libros con filtros
export function getBooks(req, res) {
  let { genero, fecha, editorial, autor, nombre, disponible, page = 1, limit = 10 } =
    req.query;

  let books = db.books.filter(b => !b.deleted);

  if (genero) books = books.filter(b => b.genero === genero);
  if (fecha) books = books.filter(b => b.fecha === fecha);
  if (editorial) books = books.filter(b => b.editorial === editorial);
  if (autor) books = books.filter(b => b.autor === autor);
  if (nombre) books = books.filter(b => b.nombre.includes(nombre));
  if (disponible) books = books.filter(b => b.disponible == disponible);

  const start = (page - 1) * limit;
  const paginated = books.slice(start, start + limit);

  res.json({
    libros: paginated.map(b => b.nombre),
    pagina_actual: page,
    pagina_maxima: Math.ceil(books.length / limit),
    por_pagina: limit,
  });
}

// UPDATE libro
export function updateBook(req, res) {
  if (!req.user.permissions.edit_books)
    return res.status(403).json({ error: "No autorizado" });

  const book = db.books.find(b => b.id == req.params.id && !b.deleted);
  if (!book) return res.status(404).json({ error: "Libro no encontrado" });

  Object.assign(book, req.body);
  res.json({ msg: "Libro actualizado", book });
}

// DELETE libro (Soft)
export function deleteBook(req, res) {
  if (!req.user.permissions.delete_books)
    return res.status(403).json({ error: "No autorizado" });

  const book = db.books.find(b => b.id == req.params.id);
  if (!book) return res.status(404).json({ error: "Libro no encontrado" });

  book.deleted = true;
  res.json({ msg: "Libro inhabilitado" });
}
