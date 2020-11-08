const products = require('./products');

const sum = products.reduce(function(acc, curr){
    return acc + curr.price
}, 0);

console.log(sum);