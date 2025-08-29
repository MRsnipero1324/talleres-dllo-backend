
// Punto 1
function findMax(lista) {
  let max = lista[0];
  for (let i = 1; i < lista.length; i++) {
    if (lista[i] > max) max = lista[i];
  }
  return max;
}

// Punto 2
function includes(lista, numero) {
  for (let i = 0; i < lista.length; i++) {
    if (lista[i] === numero) return true;
  }
  return false;
}

// Punto 3
function sum(lista) {
  let total = 0;
  for (let i = 0; i < lista.length; i++) {
    total += lista[i];
  }
  return total;
}

// Punto 4
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

  const entrada = [3, 17, -1, 4, -19];
  console.log("P1:", findMax(entrada));
  console.log("P2 (2):", includes(entrada, 2));
  console.log("P2 (4):", includes(entrada, 4));
  console.log("P3:", sum(entrada));
  console.log("P4:", missingNumbers([7, 2, 4, 6, 3, 9]));
