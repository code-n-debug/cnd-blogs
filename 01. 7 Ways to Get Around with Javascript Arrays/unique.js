const data = require('./products');

// get stores
let stores = data.map(function(product){
    return product.store;
});

console.log(stores);

let unique = new Set(stores);

console.log(unique);

let uniqueIntoArray = [...unique]; // ['E-bay', 'Lazada', 'Amazon', 'Shopee']
console.log(uniqueIntoArray)