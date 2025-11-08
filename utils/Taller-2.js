function findMax(lista) {
  let max = lista[0];
  for (let i = 1; i < lista.length; i++) {
    if (lista[i] > max) max = lista[i];
  }
  return max;
}

function includes(lista, numero) {
  for (let i = 0; i < lista.length; i++) {
    if (lista[i] === numero) return true;
  }
  return false;
}

function sum(lista) {
  let total = 0;
  for (let i = 0; i < lista.length; i++) {
    total += lista[i];
  }
  return total;
}

function missingNumbers(lista) {
  let min = lista[0];
  let max = lista[0];

  for (let i = 1; i < lista.length; i++) {
    if (lista[i] < min) min = lista[i];
    if (lista[i] > max) max = lista[i];
  }

  const faltantes = [];

  for (let x = min + 1; x < max; x++) {
    let encontrado = false;
    for (let i = 0; i < lista.length; i++) {
      if (lista[i] === x) {
        encontrado = true;
        break;
      }
    }
    if (!encontrado) faltantes.push(x);
  }

  return faltantes;
}

module.exports = { findMax, includes, sum, missingNumbers };
