const fs = require('fs');

process.argv.forEach((val, index) => {
    console.log(`${index}: ${val}`)
})

function readFile (filename) {
    return new Promise(function (resolve, reject) {
        fs.readFile(filename, function(error, data) {
            if (error) reject(error);
            else resolve(parseInt(data));
        });
    });
}

async function calcularValor() {
    try{
        let valor1 = await readFile('./1.txt');
        let valor2 = await readFile('./2.txt');
        return valor1+valor2;
    } catch(error){
        return error;
    }
};
calcularValor()
.then(function(data){
    console.log(data);
})
.catch(function(error){
    console.log(error);
})
/*console.log('a');
calcularValor ();
console.log('b');
console.log('c');*/


//node example_1.js UFAM icomp
