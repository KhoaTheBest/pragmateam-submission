import fetch from 'node-fetch';
import { getProductTemptResponse } from '../utils/temperatureUtil.js';

const SERVICE_URL = 'https://temperature-sensor-service.herokuapp.com';

export const getByProductId = async (req, res) => {
  const { id: productId } = req.params;

  if (!productId) {
    return res.status(404).send({
      message: 'Invalid Product ID'
    });
  }

  try {
    const response = await fetch(`${SERVICE_URL}/sensor/${productId}`);
    const responseInJson = await response.json();

    // Throw error when failed to fetch 3rd party response
    if (!response.ok) {
      throw new Error(responseInJson.message);
    }

    // Formatting response
    const formattedResponse = getProductTemptResponse({
      productId: responseInJson.id,
      curTempt: responseInJson.temperature
    });

    return res.send({
      id: formattedResponse.id,
      temperature: formattedResponse.temperature,
      name: formattedResponse.name,
      status: formattedResponse.status
    })

  } catch (error) {
    return res.status(500).send({
      message: error.message
    });
  }
}
