import { useState, useEffect } from 'react';
import { useGetProductTempt } from '../hooks/useGetProductTempt';

const ProductItem = ({ id: productId }) => {
  const { query: getProduct } = useGetProductTempt();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!productId) {
      return;
    }

    const request = () =>
      getProduct(productId).then((_product) => {
        setProduct(_product);
      }).catch((error) => {
        console.error(error.message);
      });

    request();
    const _interval = setInterval(request, 5000);

    // Clear interval when unmouted
    return () => clearInterval(_interval);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  if (!product) {
    return null;
  }

  return <tr>
    <td width={150} data-testid="tr-product">{product.name}</td>
    <td width={150} data-testid="tr-temperature">{product.temperature}</td>
    <td width={150} data-testid="tr-status"><span>{product.status}</span></td>
  </tr>
}

export default ProductItem; 