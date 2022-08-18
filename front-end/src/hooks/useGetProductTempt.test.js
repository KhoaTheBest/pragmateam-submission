import * as useGetProductTempHook from './useGetProductTempt';

describe('useGetProductItem hook', () => {
  it('should throw Error when product is not found', () => {
    const { query } = useGetProductTempHook.useGetProductTempt();
    return expect(query()).rejects.toEqual(new Error('Product Id is required'));
  });

  it('should throw Error when failed to fetch product temperature api with server errod code 500', () => {
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      ok: false,
      json: () => Promise.resolve({
        message: "server error"
      })
    }));

    const { query } = useGetProductTempHook.useGetProductTempt();
    return expect(query(1)).rejects.toEqual(new Error('server error'));
  });

  it('should return product', () => {
    const fakeProduct = {
      name: "Test Product A",
      temperature: 123,
      status: "All good"
    };

    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(fakeProduct)
    }));

    const { query } = useGetProductTempHook.useGetProductTempt();
    ;
    return expect(query(1)).resolves.toEqual(fakeProduct); 
  });
});