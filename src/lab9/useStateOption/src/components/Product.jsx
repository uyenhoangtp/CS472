import React from 'react';

function Product(props) {
  const nameStyle = {
    color: props.inStock ? 'green' : 'red'
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      <h3 style={nameStyle}>{props.name}</h3>
      <p>Price: ${props.price}</p>
      <p>Status: {props.inStock ? 'In Stock' : 'Out of Stock'}</p>
      <button onClick={props.onToggle}>Toggle Stock</button>
    </div>
  );
}

export default Product;
