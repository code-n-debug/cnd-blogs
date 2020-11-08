
const products = require('./products');

// asc by price
products.sort(function(a, b){
    return a.price - b.price;
});

console.log(products);

// desc by price
products.sort(function(a, b){
    return b.price - a.price;
});

console.log(products);