const express = require('express');
const router = express.Router();
const { findMax, includes, sum, missingNumbers } = require('../utils/Taller-2');

// Ruta 1 

router.post('/findMax', (req, res) => {
  const { lista } = req.body;
  if (!Array.isArray(lista) || lista.length === 0) {
    return res.status(400).json({ error: 'Debes enviar una lista no vacía' });
  }
  const resultado = findMax(lista.map(Number));
  res.json({ lista, maximo: resultado });
});

// Ruta 2 

router.post('/includes', (req, res) => {
  const { lista, numero } = req.body;
  if (!Array.isArray(lista) || numero === undefined) {
    return res.status(400).json({ error: 'Faltan parámetros: lista o numero' });
  }
  const resultado = includes(lista.map(Number), Number(numero));
  res.json({ lista, numero: Number(numero), encontrado: resultado });
});

// Ruta 3 

router.post('/sum', (req, res) => {
  const { lista } = req.body;
  if (!Array.isArray(lista)) {
    return res.status(400).json({ error: 'Debes enviar una lista' });
  }
  const resultado = sum(lista.map(Number));
  res.json({ lista, suma: resultado });
});

// Ruta 4 

router.post('/missingNumbers', (req, res) => {
  const { lista } = req.body;
  if (!Array.isArray(lista) || lista.length === 0) {
    return res.status(400).json({ error: 'Debes enviar una lista no vacía' });
  }
  const resultado = missingNumbers(lista.map(Number));
  res.json({ lista, faltantes: resultado });
});

module.exports = router;
