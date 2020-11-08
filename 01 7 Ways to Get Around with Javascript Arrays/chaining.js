const data = require('./products');

// sum all ebay products
// combine filter and reduce
const AllEbayPrice = data.filter(function(product){
    return product.store === 'E-bay';
}).reduce(function(acc, curr){
    return acc + curr.price;
}, 0);

console.log(AllEbayPrice);

// add property then filter
// combine map and filter
const AddProperty = data.map(function(product){
    product.is_low = product.qty < 10;
    return product;
}).filter(function(product){
    return product.is_low;
});

console.log(AddProperty);