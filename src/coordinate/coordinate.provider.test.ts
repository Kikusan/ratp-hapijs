import makeCoordinateProvider from './coordinate.provider';
import 'dotenv/config';

describe('Coordinate Provider', () => {
  let coordinateProxy;

  describe('get', () => {
    let result;
    let fetchMock;

    afterEach(() => {
      fetchMock.mockRestore();
    });
    describe('on success', () => {
      describe('without query', () => {
        beforeEach(async () => {
          fetchMock = jest.fn().mockReturnValue({
            json: jest.fn(() => ({ data: [{}, {}] })),
            status: 200,
          });
          const coordinateProxy = makeCoordinateProvider({
            fetch: fetchMock,
          });
          const query = '';
          result = await coordinateProxy.get(query);
        });
        it('should call fetchMock', () => {
          expect(fetchMock).toHaveBeenCalled();
        });
        it('should return array of coordinates', () => {
          expect(result).toEqual({ data: [{}, {}] });
        });
      });
      describe('with query', () => {
        beforeEach(async () => {
          fetchMock = jest.fn().mockReturnValue({
            json: jest.fn(() => ({ data: [{}, {}] })),
            status: 200,
          });
          const coordinateProxy = makeCoordinateProvider({
            fetch: fetchMock,
          });
          const query = '&q=val+de+fontenay&rows=20&start=40&sort=-stop_name';
          result = await coordinateProxy.get(query);
        });
        it('should call fetchMock', () => {
          expect(fetchMock).toHaveBeenCalledWith(
            `${process.env.RATP_API}&q=val+de+fontenay&rows=20&start=40&sort=-stop_name`,
          );
        });
      });
    });
    describe('on fail', () => {
      beforeEach(() => {
        fetchMock = jest.fn().mockReturnValue({
          json: jest.fn(() => ({})),
          status: 500,
        });
        coordinateProxy = makeCoordinateProvider({
          fetch: fetchMock,
        });
      });

      it('should throw', async () => {
        const params = {
          location: undefined,
          page: undefined,
          itemPerPage: undefined,
          sortByName: undefined,
        };
        await expect(coordinateProxy.get(params)).rejects.toThrow();
      });
    });
  });
});
