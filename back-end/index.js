import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import * as temperatureController from './src/controllers/temperatureController.js';

const app = express();
const port = 8081;

app.use(cors());
app.use(morgan('tiny'));
app.get('/temperature/:id', temperatureController.getByProductId);

app.listen(port, () => {
  console.log(`SensorTech server at http://localhost:${port}`);
});
