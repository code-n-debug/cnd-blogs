# Basic Array Overview

> Watch the youtube video version [here](https://youtu.be/N3IEyQNmRcM).

Before we start fiddling with the array, let's first start with the basics.

So there are 2 ways to initialize an array:

Either by this

```js
let products = [];
```

or this

```js
let products = new Array();
```

Now you know how to initialize an array, let's create some data!
Elements in an array can be anything.

Do you want to store numbers?

```js
let numbers = [5, 4, 3, 2, 1];
```

Maybe you want to add strings?

```js
let strings = ['e', 'd', 'c', 'b', 'a'];
```

Or you want to add booleans?

```js
let booleans = [true, false, true, false, true];
```

Since arrays are list-like objects, we can also store objects (JSON).

```js
let product = [
  { id: 1, store: 'E-bay', name: 'Ball', qty: 26, price: 500 },
  { id: 2, store: 'Lazada', name: 'Table', qty: 37, price: 1550 },
  { id: 3, store: 'E-bay', name: 'Sausages', qty: 2, price: 150 },
  { id: 4, store: 'Lazada', name: 'Shirt', qty: 19, price: 550 },
  { id: 5, store: 'E-bay', name: 'Soap', qty: 12, price: 100 },
  { id: 6, store: 'Amazon', name: 'Shoes', qty: 20, price: 4350 },
  { id: 7, store: 'Shopee', name: 'Bike', qty: 31, price: 10500 },
  { id: 8, store: 'Amazon', name: 'Keyboard', qty: 3, price: 3500 },
  { id: 9, store: 'Amazon', name: 'Fish', qty: 15, price: 120 },
  { id: 10, store: 'E-bay', name: 'Mouse', qty: 45, price: 600 }
];
```

> `JSON` stands for Javascript object notation. It's a collection of key-value pairs.

# 1. You need to know about sorting with `Array.sort`

It's relatively easy to sort in Javascript. You have to add `Array.sort` in your array.

By default, elements are sorted in an ASCENDING manner.

`number.sort()` will show

```js
[1, 2, 3, 4, 5];
```

`strings.sort()` will show

```js
['a', 'b', 'c', 'd', 'e'];
```

`booleans.sort()` will show

```js
[false, false, true, true, true];
```

It gets trickier if you sort objects.
`products.sort()` will not sort your objects

You can't sort an object like this because the sort function doesn't know what to sort in the object. You have to specify if you want to sort by `price`, `name`, `id`, `store`, or `qty` (properties of the object).

To resolve the issue, we have to add a function inside the sort method.

Now we can sort in ascending order

```js
products.sort(function(a, b) {
  return a.price - b.price;
});

/**
Will result to
[
  { id: 5, store: 'E-bay', name: 'Soap', qty: 12, price: 100 },     
  { id: 9, store: 'Amazon', name: 'Fish', qty: 15, price: 120 },    
  { id: 3, store: 'E-bay', name: 'Sausages', qty: 2, price: 150 },  
  { id: 1, store: 'E-bay', name: 'Ball', qty: 26, price: 500 },     
  { id: 4, store: 'Lazada', name: 'Shirt', qty: 19, price: 550 },   
  { id: 10, store: 'E-bay', name: 'Mouse', qty: 45, price: 600 },   
  { id: 2, store: 'Lazada', name: 'Table', qty: 37, price: 1550 },  
  { id: 8, store: 'Amazon', name: 'Keyboard', qty: 3, price: 3500 },
  { id: 6, store: 'Amazon', name: 'Shoes', qty: 20, price: 4350 },  
  { id: 7, store: 'Shopee', name: 'Bike', qty: 31, price: 10500 }   
]
**/
```

And if you want to sort in descending order. Just replace what comes first.

```js
products.sort(function(a, b) {
  return b.price - a.price;
});

/**
Will result to
[
  { id: 7, store: 'Shopee', name: 'Bike', qty: 31, price: 10500 },
  { id: 6, store: 'Amazon', name: 'Shoes', qty: 20, price: 4350 },
  { id: 8, store: 'Amazon', name: 'Keyboard', qty: 3, price: 3500 },
  { id: 2, store: 'Lazada', name: 'Table', qty: 37, price: 1550 },
  { id: 10, store: 'E-bay', name: 'Mouse', qty: 45, price: 600 },
  { id: 4, store: 'Lazada', name: 'Shirt', qty: 19, price: 550 },
  { id: 1, store: 'E-bay', name: 'Ball', qty: 26, price: 500 },
  { id: 3, store: 'E-bay', name: 'Sausages', qty: 2, price: 150 },
  { id: 9, store: 'Amazon', name: 'Fish', qty: 15, price: 120 },
  { id: 5, store: 'E-bay', name: 'Soap', qty: 12, price: 100 }
]
**/
```

With this, you can now sort any array that you want.

# 2. Transforming your array with `Array.map`

From the method itself: map, which means that you can transform your array into a different format.

`Array.map` accepts a callback function with numerous arguments. Most of the time, you will need the first argument.

We can transform our products into prices only.

```js
const priceOnly = data.map(function(product) {
  return product.price;
});

/**
Will result to
[
    500, 1550,  150,
    550,  100, 4350,
  10500, 3500,  120,
    600
]
**/
```

This will return an integer list of prices. Also, if we want to return an object:

```js
const nameAndPrice = data.map(function(product) {
  return {
    name: product.name,
    price: product.price
  };
});

/**
Will result to
[
  { name: 'Ball', price: 500 },
  { name: 'Table', price: 1550 },
  { name: 'Sausages', price: 150 },
  { name: 'Shirt', price: 550 },
  { name: 'Soap', price: 100 },
  { name: 'Shoes', price: 4350 },
  { name: 'Bike', price: 10500 },
  { name: 'Keyboard', price: 3500 },
  { name: 'Fish', price: 120 },
  { name: 'Mouse', price: 600 }
]
**/
```

Now we can return an object.

The best thing with this is, it doesn't modify your original array because `Array.map` returns a new set of array.

# 3. Filtering your array with `Array.filter`

The good thing with `Array.filter` is that it's the same as Array.map.

`Array.filter` also accepts a callback function. Most of the time, you need the first argument.

When using `Array.filter`, you should ask yourself. _"What am I looking for?"_
By using that format, we can now start filtering our array.

I want to get products which price is greater than 5000, so I can say that it's expensive.

```js
const expensive = data.filter(function(product) {
  return product.price > 5000;
});

/**
Will result to
[ { id: 7, store: 'Shopee', name: 'Bike', qty: 31, price: 10500 } ]
**/
```

I want to get products which is low in stock, so I can send alert to store owners.

```js
const lowQty = data.filter(function(product) {
  return product.qty < 10;
});

/**
Will result to
[
  { id: 3, store: 'E-bay', name: 'Sausages', qty: 2, price: 150 },
  { id: 8, store: 'Amazon', name: 'Keyboard', qty: 3, price: 3500 }
]
**/
```

Are there any cheap products that I can buy in Lazada?

```js
const cheapLazadaProducts = data.filter(function(product) {
  return product.store === 'Lazada' && product.price < 1000;
});

/**
Will result to
[ { id: 4, store: 'Lazada', name: 'Shirt', qty: 19, price: 550 } ]
**/
```

Are there any cheap products in E-bay?

```js
const cheapProductsInEbay = data.filter(function(product) {
  return product.price < 100 && product.store === 'E-bay';
});

/**
Will result to 
[]
**/
```

The best thing with this is, it doesn't modify your original array because `Array.filter` returns a new set of array the same as `Array.map`.

# 4. Summation with `Array.reduce`

In most cases, we loop through an array to sum its values. We can do better by using `Array.reduce`.

```js
const sum = products.reduce(function(acc, curr) {
  return acc + curr.price;
}, 0);

/**
Will result to
21920
**/
```

- `acc` is the accumulator
- `curr` is the current element in the loop
- 0 is the initial value of the accumulator

There are more things we can do with `Array.reduce`. Like flattening an array or getting min or max values.

What's really interesting is if we combine this to `Array.map` and `Array.filter`.

# 5. Chaining with Javascript

Since we are using `Array.prototype`, we can be more creative on how we will combine all the functions we learned so far into 1 statement.

The key here is to be creative in what do you want to achieve.

For example:

I want to sum all the prices of E-bay products.

We can chain `filter` and `reduce`.

```js
// combine filter and reduce
cost AllEBayPrice = data.filter(function(product){
	// first we get the store
	return product.store === 'E-bay'
}).reduce(function(acc, curr){
	// sum it's prices
	return acc + curr.price
}, 0)

/**
Will result to
1350
**/
```

I want to get all the low qty products.

We can chain `map` and `filter`.

```js
// combine map and filter
const addElementWithFilter = data
  .map(function(product) {
    // add is_low property that checks the qty of each product
    product.is_low = product.qty < 10 ? true : false;
    return product;
  })
  .filter(function(product) {
    // get only product that is low
    return product.is_low;
  });
/**
Will result to
[
  { id: 3,store: 'E-bay', name: 'Sausages', qty: 2, price: 150, is_low: true },
  { id: 8, store: 'Amazon', name: 'Keyboard', qty: 3, price: 3500, is_low: true }
]
**/
```

Chaining is a powerful tool that lessens the complexity and improves the readability of the code.

# 6. Getting unique values with `Set` and Spread (`...`) operators

Getting unique values is not part of `Array.prototypes`, but we can use `Set` and Spread (`...`) operators to achieve this.

Let's say we want to get all stores in our products.
We can start by mapping only the stores.

```js
let stores = data.map(function(product) {
  return product.store;
});
/**
Will result to
[
  'E-bay',  'Lazada',
  'E-bay',  'Lazada',
  'E-bay',  'Amazon',
  'Shopee', 'Amazon',
  'Amazon', 'E-bay'
]
**/
```

After we got all the stores, we can put this in a set to get only the unique values.

```js
let unique = new Set(stores);
/**
Will result to
Set { 'E-bay', 'Lazada', 'Amazon', 'Shopee' }
**/
```

Now the `unique` is not in an array, so we have to use the spread (`...`) operator to convert it from `Set` to `Array` type.

```js
let uniqueIntoArray = [...unique];
/**
Will result to
[ 'E-bay', 'Lazada', 'Amazon', 'Shopee' ]
**/
```

By just adding spread syntax (`...`) in our variable inside of a bracket, it will automatically convert our `Set` to an `Array`.

Now we can use the result to chain it to other `Array.prototypes`.

# 7. Joining of Array values with `Array.join`

When we join values in an Array, we are partly doing string manipulation.
Because `Array.join` returns a string as an output.

Let's say we want to add a download feature to your application.
We can generate comma-separated-values (CSV) based on our arrays using `Array.join`.

First, we need to join each property of our object with a comma `(,)`, so we will use `Array.map`. The result of that map should also be joined by `\n` (next line).

```js
const csv = data.map(function(product) {
  return [product.id, product.store, product.name, product.qty, product.price].join(',');
});
/**
Will result to
[
  '1,E-bay,Ball,26,500',
  '2,Lazada,Table,37,1550',
  '3,E-bay,Sausages,2,150',
  '4,Lazada,Shirt,19,550',
  '5,E-bay,Soap,12,100',
  '6,Amazon,Shoes,20,4350',
  '7,Shopee,Bike,31,10500',
  '8,Amazon,Keyboard,3,3500',
  '9,Amazon,Fish,15,120',
  '10,E-bay,Mouse,45,600'
]
**/
```

Completing our CSV by adding next line.

```js
const csv = data
  .map(function(product) {
    return [product.id, product.store, product.name, product.qty, product.price].join(',');
  })
  .join('\n');
/**
Will result to
1,E-bay,Ball,26,500
2,Lazada,Table,37,1550
3,E-bay,Sausages,2,150
4,Lazada,Shirt,19,550
5,E-bay,Soap,12,100
6,Amazon,Shoes,20,4350
7,Shopee,Bike,31,10500
8,Amazon,Keyboard,3,3500
9,Amazon,Fish,15,120
10,E-bay,Mouse,45,600
**/
```

Voila! We now have CSV.

# Summary

Use cases may vary, but knowing these 7 ways will save you a lot of time dealing with Javascript Arrays.

Happy Coding :)

  
