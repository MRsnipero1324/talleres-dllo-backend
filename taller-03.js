// Punto 1
function desglosarString(cadena, tipo) {
  const vocales = "aeiouAEIOU".split("");
  const letras = [...cadena].filter(l => /[a-zA-Z]/.test(l));

  return tipo === "vocales"
    ? letras.filter(l => vocales.includes(l)).length
    : letras.filter(l => !vocales.includes(l)).length;
}

// Punto 2
function twoSum(nums, objetivo) {
  return nums
    .map((n, i) => [i, nums.findIndex((m, j) => j !== i && n + m === objetivo)])
    .find(([i, j]) => j !== -1) || [];
}

// Punto 3
function conversionRomana(romano) {
  const valores = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  return [...romano].reduce((acc, actual, i, arr) => {
    const val = valores[actual];
    const sig = valores[arr[i + 1]] || 0;
    return acc + (val < sig ? -val : val);
  }, 0);
}

// Punto 4
function descomposicion(entrada) {
  const [palabraObjetivo, ...diccionario] = entrada.split(",");

  return diccionario
    .map(w1 =>
      diccionario
        .filter(w2 => w1 !== w2 && w1 + w2 === palabraObjetivo)
        .map(w2 => [w1, w2])
    )
    .flat()[0] || [];
}

// Ejemplos de prueba
 console.log(desglosarString("murcielagos", "vocales")); // 5
 console.log(desglosarString("murcielagos", "consonantes")); // 6
 console.log(twoSum([2, 7, 11, 15], 9)); // [0,1]
 console.log(conversionRomana("MCMXCVII")); // 1997
 console.log(descomposicion("malhumor,al,hum,humor,m,mal,malhu")); // ["mal", "humor"]
