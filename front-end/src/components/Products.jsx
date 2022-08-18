import React from 'react';
import ProductItem from './ProductItem';

const ProductIDs = ['1', '2', '3', '4', '5', '6'];

const Products = () => {
  return (
    <>
      <h2>Beers</h2>
      <table>
        <thead>
          <tr>
            <th align="left" data-testid="th-product">Product</th>
            <th align="left" data-testid="th-temperature">Temperature</th>
            <th align="left" data-testid="th-status">Status</th>
          </tr>
        </thead>
        <tbody>
          {ProductIDs.map((prodId) => <ProductItem key={prodId} id={prodId} />)}
        </tbody>
      </table>
    </>
  );
};

export default Products;