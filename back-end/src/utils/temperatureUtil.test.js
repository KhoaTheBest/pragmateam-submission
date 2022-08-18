import { getProductTemptResponse } from './temperatureUtil';

describe('TemperatureUtil', () => {

  describe('getProductTemptResponse', () => {
    it('should throw Error of invalid Product ID', () => {
      expect(() => getProductTemptResponse({})).toThrowError(new Error('Invalid Product ID'));
    });

    it('should return product without status when no matching Product', () => {
      const fakeProduct = { productId: 9, curTempt: 5 };
      const product = getProductTemptResponse(fakeProduct);
      expect(product).toEqual({
        id: 9,
        temperature: 5
      });
    });

    it('should return product 1 with status all good', () => {
      const product = getProductTemptResponse({ productId: 1, curTempt: 5 });
      expect(product).toEqual({
        id: 1,
        temperature: 5,
        name: "Pilsner",
        status: "all good"
      });
    });

    it('should return product 3 with status too low', () => {
      const product = getProductTemptResponse({ productId: 3, curTempt: 3 });
      expect(product).toEqual({
        id: 3,
        temperature: 3,
        name: "Lager",
        status: "too low"
      });
    });

    it('should return product 3 with status too high', () => {
      const product = getProductTemptResponse({ productId: 6, curTempt: 7 });
      expect(product).toEqual({
        id: 6,
        temperature: 7,
        name: "Pale Ale",
        status: "too high"
      });
    });
  });
});