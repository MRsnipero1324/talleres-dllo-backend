const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // Necesario para leer req.body

const taller1Routes = require('./routes/taller-1');
app.use('/taller1', taller1Routes);

const taller2Routes = require('./routes/taller-2');
app.use('/taller2', taller2Routes);

const taller3Routes = require('./routes/taller-3');
app.use('/taller3', taller3Routes);

app.get('/', (req, res) => {
  res.json({ message: `Servidor API corriendo en puerto ${port}` });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
