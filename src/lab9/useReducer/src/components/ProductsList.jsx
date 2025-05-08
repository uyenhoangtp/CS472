import React, { useReducer } from 'react';
import Product from './Product';

const initialData = [
  { id: 1, name: 'Apple', price: 1, inStock: true },
  { id: 2, name: 'Banana', price: 1, inStock: false },
  { id: 3, name: 'Cherry', price: 2, inStock: true },
];

function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_STOCK':
      return state.map(product =>
        product.id === action.id ? { ...product, inStock: !product.inStock } : product
      );
    default:
      return state;
  }
}

function ProductsList() {
  const [products, dispatch] = useReducer(reducer, initialData);

  return (
    <div>
      {products.map(product => (
        <Product
          key={product.id}
          {...product}
          onToggle={() => dispatch({ type: 'TOGGLE_STOCK', id: product.id })}
        />
      ))}
    </div>
  );
}

export default ProductsList;