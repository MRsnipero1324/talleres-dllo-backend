
//------------------------------------------------------------------------
function convertidorTemp(celsius) {
    return (celsius * (9 / 5)) + 32;
}


console.log("Punto 1:");
console.log(convertidorTemp(0));   
console.log(convertidorTemp(100)); 

//------------------------------------------------------------------------

function resolvedor(a, b, c, positivo = true) {
    let discriminante = Math.sqrt(b * b - 4 * a * c);
    if (positivo) {
        return (-b + discriminante) / (2 * a);
    } else {
        return (-b - discriminante) / (2 * a);
    }
}

console.log("\nPunto 2:");
console.log(resolvedor(1, 5, 4, true));  
console.log(resolvedor(1, 5, 4, false)); 

//-------------------------------------------------------------------------


function mejorParidad(numero) {
    return numero % 2 === 0;
}

console.log("\nPunto 3:");
console.log(mejorParidad(4));
console.log(mejorParidad(7)); 

//-------------------------------------------------------------------------

function peorParidad(numero) {
    if (numero === 0) return true;
    else if (numero === 1) return false;
    else if (numero === 2) return true;
    else if (numero === 3) return false;
    else if (numero === 4) return true;
    else if (numero === 5) return false;
    else if (numero === 6) return true;
    else if (numero === 7) return false;
    else if (numero === 8) return true;
    else if (numero === 9) return false;
    else if (numero === 10) return true;
    else return null; 
}

console.log("\nPunto 4:");
console.log(peorParidad(4));  
console.log(peorParidad(7));  
console.log(peorParidad(11)); 

//---------------------------------------------------------------------------