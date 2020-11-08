const data = require('./products');

let output = data.map(function(product){
    return product.price;
});

console.log(output);

let outputWithName = data.map(function(product){
    return {
        name: product.name,
        price: product.price
    };
});

console.log(outputWithName);