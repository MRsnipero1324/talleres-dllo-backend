import { db } from "../utils/db.js";
import { generateToken } from "../utils/auth.js";

// CREATE (registro)
export function createUser(req, res) {
  const { name, email, password, permissions = {} } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "Email y password requeridos" });

  const exists = db.users.find(u => u.email === email);
  if (exists) return res.status(400).json({ error: "Usuario ya existe" });

  const user = {
    id: db.users.length + 1,
    name,
    email,
    password,
    permissions,
    deleted: false,
    history: []
  };

  db.users.push(user);
  res.json({ msg: "Usuario creado", user });
}

// LOGIN (READ seguro)
export function login(req, res) {
  const { email, password } = req.body;

  const user = db.users.find(
    u => u.email === email && u.password === password && !u.deleted
  );

  if (!user) return res.status(400).json({ error: "Credenciales inválidas" });

  const token = generateToken({ id: user.id, permissions: user.permissions });

  res.json({ token });
}

// READ user info
export function getUser(req, res) {
  const user = db.users.find(u => u.id === req.user.id && !u.deleted);
  if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

  res.json(user);
}

// UPDATE user
export function updateUser(req, res) {
  const { id } = req.params;
  const user = db.users.find(u => u.id == id && !u.deleted);

  if (!user) return res.status(404).json({ error: "Usuario no existe" });

  // Permiso o propietario
  if (req.user.id != id && !req.user.permissions.edit_users)
    return res.status(403).json({ error: "No autorizado" });

  Object.assign(user, req.body);
  res.json({ msg: "Usuario actualizado", user });
}

// DELETE (Soft delete)
export function deleteUser(req, res) {
  const { id } = req.params;
  const user = db.users.find(u => u.id == id);

  if (!user) return res.status(404).json({ error: "Usuario no existe" });

  // Permiso o propietario
  if (req.user.id != id && !req.user.permissions.delete_users)
    return res.status(403).json({ error: "No autorizado" });

  user.deleted = true;
  res.json({ msg: "Usuario inhabilitado" });
}
