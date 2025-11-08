

function convertidorTemp(celsius) {
    return (celsius * (9 / 5)) + 32;
}


function resolvedor(a, b, c, positivo = true) {
    let discriminante = Math.sqrt(b * b - 4 * a * c);
    if (positivo) {
        return (-b + discriminante) / (2 * a);
    } else {
        return (-b - discriminante) / (2 * a);
    }
}




function mejorParidad(numero) {
    return numero % 2 === 0;
}



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


module.exports = { convertidorTemp, resolvedor, mejorParidad, peorParidad };