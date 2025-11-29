/**
 * Tests para Books Controller
 * Cada función debe ser probada:
 *  - Caso exitoso
 *  - Caso fallido por validación
 */

import {
  createBook,
  getBook,
  getBooks,
  updateBook,
  deleteBook
} from "../controllers/books.controlador.js";

import { db } from "../utils/db.js";
import { jest } from '@jest/globals';



// Simular res
function mockResponse() {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
}

beforeEach(() => {
  db.books.length = 0;
});


// -----------------------------
// CREATE BOOK
// -----------------------------
describe("createBook()", () => {
  test(" Crear libro exitosamente con permisos", () => {
    const req = {
      user: { id: 1, permissions: { create_books: true } },
      body: { nombre: "Libro A", autor: "Juan", disponible: true }
    };
    const res = mockResponse();

    createBook(req, res);

    expect(res.json).toHaveBeenCalled();
    expect(db.books.length).toBe(1);
  });

  test(" Fallo al crear libro sin permisos", () => {
    const req = {
      user: { id: 1, permissions: {} },
      body: { nombre: "Libro A" }
    };
    const res = mockResponse();

    createBook(req, res);

    expect(res.status).toHaveBeenCalledWith(403);
  });
});


// -----------------------------
// GET ONE BOOK
// -----------------------------
describe("getBook()", () => {
  beforeEach(() => {
    db.books.push({
      id: 1,
      nombre: "Libro A",
      autor: "Juan",
      disponible: true,
      deleted: false
    });
  });

  test(" Obtener un libro existente", () => {
    const req = { params: { id: 1 } };
    const res = mockResponse();

    getBook(req, res);

    expect(res.json).toHaveBeenCalled();
    expect(res.json.mock.calls[0][0].nombre).toBe("Libro A");
  });

  test(" Fallo al pedir libro inexistente", () => {
    const req = { params: { id: 99 } };
    const res = mockResponse();

    getBook(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });
});


// -----------------------------
// GET MANY BOOKS (con filtros + paginación)
// -----------------------------
describe("getBooks()", () => {
  beforeEach(() => {
    db.books.push(
      { id: 1, nombre: "Libro A", genero: "Aventura", autor: "Juan", disponible: true, deleted: false },
      { id: 2, nombre: "Libro B", genero: "Horror", autor: "Pedro", disponible: false, deleted: false }
    );
  });

  test(" Obtener libros sin filtros", () => {
    const req = { query: {} };
    const res = mockResponse();

    getBooks(req, res);

    expect(res.json).toHaveBeenCalled();
    expect(res.json.mock.calls[0][0].libros.length).toBe(2);
  });

  test(" Filtrar por género", () => {
    const req = { query: { genero: "Aventura" } };
    const res = mockResponse();

    getBooks(req, res);

    expect(res.json).toHaveBeenCalled();
    expect(res.json.mock.calls[0][0].libros[0]).toBe("Libro A");
  });

  test(" Filtrar por género inexistente (regresa vacío)", () => {
    const req = { query: { genero: "SciFi" } };
    const res = mockResponse();

    getBooks(req, res);

    expect(res.json).toHaveBeenCalled();
    expect(res.json.mock.calls[0][0].libros.length).toBe(0);
  });
});


// -----------------------------
// UPDATE BOOK
// -----------------------------
describe("updateBook()", () => {
  beforeEach(() => {
    db.books.push({
      id: 1,
      nombre: "Libro A",
      autor: "Juan",
      disponible: true,
      deleted: false
    });
  });

  test(" Actualizar libro con permisos", () => {
    const req = {
      params: { id: 1 },
      user: { permissions: { edit_books: true } },
      body: { nombre: "Libro A Editado" }
    };

    const res = mockResponse();
    updateBook(req, res);

    expect(res.json).toHaveBeenCalled();
    expect(db.books[0].nombre).toBe("Libro A Editado");
  });

  test(" Fallo actualizar libro sin permisos", () => {
    const req = {
      params: { id: 1 },
      user: { permissions: {} },
      body: { nombre: "Nuevo" }
    };

    const res = mockResponse();

    updateBook(req, res);

    expect(res.status).toHaveBeenCalledWith(403);
  });

  test(" Fallo libro no encontrado", () => {
    const req = {
      params: { id: 99 },
      user: { permissions: { edit_books: true } },
      body: { nombre: "Nuevo" }
    };

    const res = mockResponse();

    updateBook(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });
});


// -----------------------------
// DELETE BOOK (soft delete)
// -----------------------------
describe("deleteBook()", () => {
  beforeEach(() => {
    db.books.push({
      id: 1,
      nombre: "Libro A",
      deleted: false
    });
  });

  test(" Inhabilitar libro con permisos (soft delete)", () => {
    const req = {
      params: { id: 1 },
      user: { permissions: { delete_books: true } }
    };

    const res = mockResponse();

    deleteBook(req, res);

    expect(res.json).toHaveBeenCalled();
    expect(db.books[0].deleted).toBe(true);
  });

  test(" Fallo al inhabilitar sin permisos", () => {
    const req = {
      params: { id: 1 },
      user: { permissions: {} }
    };
    const res = mockResponse();

    deleteBook(req, res);

    expect(res.status).toHaveBeenCalledWith(403);
  });

  test(" Fallo libro no encontrado", () => {
    const req = {
      params: { id: 99 },
      user: { permissions: { delete_books: true } }
    };

    const res = mockResponse();

    deleteBook(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });
});
