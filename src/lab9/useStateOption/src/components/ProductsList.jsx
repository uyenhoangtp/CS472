import React, { useState } from 'react';
import Product from './Product';

const initialData = [
  { id: 1, name: 'Apple', price: 1, inStock: true },
  { id: 2, name: 'Banana', price: 1, inStock: false },
  { id: 3, name: 'Cherry', price: 2, inStock: true },
];

function ProductsList() {
  const [products, setProducts] = useState(initialData);

  const toggleInStock = (id) => {
    const updatedProducts = products.map(product =>
      product.id === id ? { ...product, inStock: !product.inStock } : product
    );
    setProducts(updatedProducts);
  };

  return (
    <div>
      {products.map(product => (
        <Product
          key={product.id}
          {...product}
          onToggle={() => toggleInStock(product.id)}
        />
      ))}
    </div>
  );
}

export default ProductsList;