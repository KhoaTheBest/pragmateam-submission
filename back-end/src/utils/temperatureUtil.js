import { data } from '../constants.js';

export const getProductTemptResponse = ({ productId, curTempt }) => {
  if (!productId) {
    throw new Error('Invalid Product ID');
  }

  let rs = {
    id: productId,
    temperature: curTempt
  }

  for (let prodData of data) {
    if (prodData.id !== productId.toString()) {
      continue;
    }

    let status = 'all good';
    if (curTempt > prodData.maximumTemperature) {
      status = 'too high';
    } else if (curTempt < prodData.minimumTemperature) {
      status = 'too low';
    }

    rs.status = status;
    rs.name = prodData.name;

    break;
  }

  return rs;
}