const data = require('./products');

// get expensive products
const expensive = data.filter(function(product){
    return product.price > 5000;
});

console.log(expensive);

// get low qty stocks
const lowQty = data.filter(function(product){
    return product.qty < 10;
});

console.log(lowQty);

// get cheap products in lazada
const cheapProductsInLazada = data.filter(function(product){
    return product.price < 1000 && product.store === 'Lazada';
});
console.log(cheapProductsInLazada);

// get cheap products in e-bay
const cheapProductsInEbay = data.filter(function(product){
    return product.price < 100 && product.store === 'E-bay';
});

console.log(cheapProductsInEbay);