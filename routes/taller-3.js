const express = require('express');
const router = express.Router();
const { desglosarString, twoSum, conversionRomana, descomposicion } = require('../utils/Taller-3');

// Ruta 1 

router.post('/desglosarString', (req, res) => {
  const { cadena, tipo } = req.body;
  if (!cadena || !tipo) {
    return res.status(400).json({ error: 'Faltan parámetros: cadena o tipo' });
  }
  if (tipo !== 'vocales' && tipo !== 'consonantes') {
    return res.status(400).json({ error: 'El tipo debe ser "vocales" o "consonantes"' });
  }

  const resultado = desglosarString(cadena, tipo);
  res.json({ cadena, tipo, cantidad: resultado });
});

// Ruta 2 

router.post('/twoSum', (req, res) => {
  const { nums, objetivo } = req.body;
  if (!Array.isArray(nums) || objetivo === undefined) {
    return res.status(400).json({ error: 'Faltan parámetros: nums (array) u objetivo' });
  }
  const resultado = twoSum(nums.map(Number), Number(objetivo));
  res.json({ nums, objetivo: Number(objetivo), indices: resultado });
});

// Ruta 3 

router.post('/conversionRomana', (req, res) => {
  const { romano } = req.body;
  if (!romano || typeof romano !== 'string') {
    return res.status(400).json({ error: 'Debes enviar una cadena romana' });
  }
  const resultado = conversionRomana(romano.toUpperCase());
  res.json({ romano: romano.toUpperCase(), decimal: resultado });
});

// Ruta 4 

router.post('/descomposicion', (req, res) => {
  const { entrada } = req.body;
  if (!entrada || typeof entrada !== 'string') {
    return res.status(400).json({ error: 'Debes enviar una cadena válida en "entrada"' });
  }
  const resultado = descomposicion(entrada);
  res.json({ entrada, combinacion: resultado });
});

module.exports = router;
