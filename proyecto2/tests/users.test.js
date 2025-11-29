/**
 * Tests para Users Controller
 * Cada función:
 *  - Caso exitoso
 *  - Caso fallido por validación
 */

import {
  createUser,
  login,
  getUser,
  updateUser,
  deleteUser
} from "../controllers/users.controlador.js";

import { db } from "../utils/db.js";
import { jest } from '@jest/globals';




// Utilidad para simular req/res
function mockResponse() {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
}

beforeEach(() => {
  // Reiniciar base de datos en cada test
  db.users.length = 0;
});


// -----------------------------
// CREATE USER
// -----------------------------
describe("createUser()", () => {
  test(" Crear usuario exitosamente", () => {
    const req = {
      body: { email: "test@mail.com", password: "1234", name: "Juan" }
    };
    const res = mockResponse();

    createUser(req, res);

    expect(res.json).toHaveBeenCalled();
    expect(db.users.length).toBe(1);
  });

  test(" Fallo al crear usuario sin email", () => {
    const req = { body: { password: "1234" } };
    const res = mockResponse();

    createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  test(" Fallo por usuario duplicado", () => {
    db.users.push({
      id: 1,
      email: "test@mail.com",
      password: "1234"
    });

    const req = {
      body: { email: "test@mail.com", password: "abcd" }
    };
    const res = mockResponse();

    createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });
});


// -----------------------------
// LOGIN
// -----------------------------
describe("login()", () => {
  beforeEach(() => {
    db.users.push({
      id: 1,
      email: "test@mail.com",
      password: "1234",
      permissions: {},
      deleted: false
    });
  });

  test(" Login exitoso", () => {
    const req = {
      body: { email: "test@mail.com", password: "1234" }
    };
    const res = mockResponse();

    login(req, res);

    expect(res.json).toHaveBeenCalled();
    expect(res.json.mock.calls[0][0]).toHaveProperty("token");
  });

  test(" Login falla por credenciales incorrectas", () => {
    const req = {
      body: { email: "test@mail.com", password: "xxx" }
    };
    const res = mockResponse();

    login(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });
});


// -----------------------------
// GET USER
// -----------------------------
describe("getUser()", () => {
  beforeEach(() => {
    db.users.push({
      id: 1,
      email: "test@mail.com",
      password: "1234",
      name: "Juan",
      deleted: false
    });
  });

  test(" Obtiene información del usuario", () => {
    const req = { user: { id: 1 } };
    const res = mockResponse();

    getUser(req, res);

    expect(res.json).toHaveBeenCalled();
    expect(res.json.mock.calls[0][0].email).toBe("test@mail.com");
  });

  test(" Fallo si el usuario no existe", () => {
    const req = { user: { id: 99 } };
    const res = mockResponse();

    getUser(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
  });
});


// -----------------------------
// UPDATE USER
// -----------------------------
describe("updateUser()", () => {
  beforeEach(() => {
    db.users.push({
      id: 1,
      email: "test@mail.com",
      password: "1234",
      name: "Juan",
      deleted: false
    });
  });

  test(" Usuario se actualiza correctamente (el mismo usuario)", () => {
    const req = {
      params: { id: 1 },
      user: { id: 1, permissions: {} },
      body: { name: "Pedro" }
    };

    const res = mockResponse();
    updateUser(req, res);

    expect(res.json).toHaveBeenCalled();
    expect(db.users[0].name).toBe("Pedro");
  });

  test(" Fallo por no tener permisos ni ser el usuario dueño", () => {
    const req = {
      params: { id: 1 },
      user: { id: 2, permissions: {} },
      body: { name: "Nuevo" }
    };

    const res = mockResponse();

    updateUser(req, res);

    expect(res.status).toHaveBeenCalledWith(403);
  });
});


// -----------------------------
// DELETE USER (soft delete)
// -----------------------------
describe("deleteUser()", () => {
  beforeEach(() => {
    db.users.push({
      id: 1,
      email: "test@mail.com",
      password: "1234",
      deleted: false
    });
  });

  test(" Usuario se inhabilita (soft delete) exitosamente", () => {
    const req = {
      params: { id: 1 },
      user: { id: 1, permissions: {} }
    };

    const res = mockResponse();

    deleteUser(req, res);

    expect(res.json).toHaveBeenCalled();
    expect(db.users[0].deleted).toBe(true);
  });

  test(" Fallo al intentar inhabilitar sin permisos ni ser el dueño", () => {
    const req = {
      params: { id: 1 },
      user: { id: 2, permissions: {} }
    };

    const res = mockResponse();

    deleteUser(req, res);

    expect(res.status).toHaveBeenCalledWith(403);
  });
});
