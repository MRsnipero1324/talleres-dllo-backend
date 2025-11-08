const express = require('express');
const router = express.Router();
const { convertidorTemp, resolvedor, mejorParidad, peorParidad } = require('../utils/Taller-1');

// Ruta 1 

router.post('/convertidorTemp', (req, res) => {
  const { celsius } = req.body;
  if (celsius === undefined) {
    return res.status(400).json({ error: 'Falta el parámetro celsius' });
  }
  const resultado = convertidorTemp(parseFloat(celsius));
  res.json({ celsius: parseFloat(celsius), fahrenheit: resultado });
});

// Ruta 2 

router.post('/resolvedor', (req, res) => {
  const { a, b, c, positivo = true } = req.body;
  if (a === undefined || b === undefined || c === undefined) {
    return res.status(400).json({ error: 'Faltan parámetros a, b o c' });
  }
  const resultado = resolvedor(
    parseFloat(a),
    parseFloat(b),
    parseFloat(c),
    Boolean(positivo)
  );
  res.json({ a, b, c, positivo: Boolean(positivo), resultado });
});

// Ruta 3 

router.post('/mejorParidad', (req, res) => {
  const { numero } = req.body;
  if (numero === undefined) {
    return res.status(400).json({ error: 'Falta el parámetro numero' });
  }
  const resultado = mejorParidad(parseInt(numero));
  res.json({ numero: parseInt(numero), par: resultado });
});

// Ruta 4 

router.post('/peorParidad', (req, res) => {
  const { numero } = req.body;
  if (numero === undefined) {
    return res.status(400).json({ error: 'Falta el parámetro numero' });
  }
  const resultado = peorParidad(parseInt(numero));
  res.json({ numero: parseInt(numero), par: resultado });
});

module.exports = router;
