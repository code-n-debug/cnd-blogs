const data = require('./products');

const csv = data.map(function(product){
    return [product.id, product.store, product.name, product.qty, product.price].join(',');
}).join('\n');

console.log(csv);