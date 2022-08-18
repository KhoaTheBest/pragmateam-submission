import fetch from 'node-fetch';
import {getByProductId} from './temperatureController';
import * as temperatureUtil from '../utils/temperatureUtil';

jest.mock('node-fetch');
jest.mock('../utils/temperatureUtil');


describe('temperatureController', () => {
  describe('getByProductId', () => {
    it('should response 404 with error message', async () => {
      const mockReq = { params: {} };
      const mockRes = {
        status: (status) => ({ send: ({ message }) => ({ status, message }) })
      }
      const rs = await getByProductId(mockReq, mockRes);

      expect(rs.status).toEqual(404);
      expect(rs.message).toEqual("Invalid Product ID");
    });

    it('should response 500 when failed to fetch product', async () => {
      const mockReq = { params: { id: 123 } };
      const mockRes = {
        status: (status) => ({ send: ({ message }) => ({ status, message }) })
      }

      fetch.mockResolvedValue({
        ok: false,
        json: () => Promise.resolve({
          message: "fake server error"
        })
      });

      const rs = await getByProductId(mockReq, mockRes);
      expect(rs.status).toEqual(500);
      expect(rs.message).toEqual("fake server error");
    });

    it('should response Product', async () => {
      const fakeResponse = {
        id: 6,
        temperature: 7,
        name: "Pale Ale",
        status: "too high"
      };
      temperatureUtil.getProductTemptResponse.mockReturnValue(fakeResponse);

      fetch.mockResolvedValue({ ok: true, json: () => Promise.resolve({ id: 7, temperature: 10 }) });

      const mockReq = { params: { id: 6 } };
      const mockRes = {
        send: (response) => response
      }

      const rs = await getByProductId(mockReq, mockRes);
      expect(rs).toEqual(fakeResponse);

    });
  });
});