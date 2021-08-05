// Object destructuring -> Extract object properties and theirs values to individual variables

const product = {
    label: 'notebook',
    price: 3,
    stock: 201,
    salePrice: undefined
}

// const {label, price, stockm, salePrice} = product
// console.log(label)

//!!!!!!!!!!!!!!! Example change name of property !!!!!!!!!!!!!!!!!!!!!!!!!!

// const {label:productLabel, price, stock, salePrice} = product
// console.log(productLabel)

// = {} Setting up default object, when we destructure an object, the code 
  // works whether or not an object is ever passed

// Destructing in function
const transaction = (type, {label, price} = {}) => {
    console.log(type, label, price);
}
transaction('order', product)
