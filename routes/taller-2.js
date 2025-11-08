const express = require('express');
const router = express.Router();
const { findMax, includes, sum, missingNumbers } = require('../utils/Taller-2');

// Ruta 1 - Encontrar el número máximo
// Body: { "lista": [3, 17, -1, 4, -19] }
router.post('/findMax', (req, res) => {
  const { lista } = req.body;
  if (!Array.isArray(lista) || lista.length === 0) {
    return res.status(400).json({ error: 'Debes enviar una lista no vacía' });
  }
  const resultado = findMax(lista.map(Number));
  res.json({ lista, maximo: resultado });
});

// Ruta 2 - Verificar si un número está en la lista
// Body: { "lista": [3, 17, -1, 4, -19], "numero": 4 }
router.post('/includes', (req, res) => {
  const { lista, numero } = req.body;
  if (!Array.isArray(lista) || numero === undefined) {
    return res.status(400).json({ error: 'Faltan parámetros: lista o numero' });
  }
  const resultado = includes(lista.map(Number), Number(numero));
  res.json({ lista, numero: Number(numero), encontrado: resultado });
});

// Ruta 3 - Sumar los elementos de una lista
// Body: { "lista": [3, 17, -1, 4, -19] }
router.post('/sum', (req, res) => {
  const { lista } = req.body;
  if (!Array.isArray(lista)) {
    return res.status(400).json({ error: 'Debes enviar una lista' });
  }
  const resultado = sum(lista.map(Number));
  res.json({ lista, suma: resultado });
});

// Ruta 4 - Encontrar los números faltantes entre el mínimo y máximo
// Body: { "lista": [7, 2, 4, 6, 3, 9] }
router.post('/missingNumbers', (req, res) => {
  const { lista } = req.body;
  if (!Array.isArray(lista) || lista.length === 0) {
    return res.status(400).json({ error: 'Debes enviar una lista no vacía' });
  }
  const resultado = missingNumbers(lista.map(Number));
  res.json({ lista, faltantes: resultado });
});

module.exports = router;
