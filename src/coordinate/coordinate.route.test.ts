import init from '../server';

describe('/coordinate', () => {
  describe('no query params', () => {
    let server, result, statusCode;
    beforeAll(async () => {
      const requestDefaults = {
        method: 'GET',
        url: '/coordinate',
        payload: {},
      };
      server = await init(3001);
      const data = await server.inject(requestDefaults);
      result = JSON.parse(data.payload);
      statusCode = data.statusCode;
    });
    afterAll(async () => {
      await server.stop();
    });

    it('should have a total', () => {
      expect(typeof result.total).toBe('number');
    });
    it('should have data with 10 elements', () => {
      expect(result.data).toHaveLength(10);
    });
    it('should have links', () => {
      expect(result._links).toBeDefined();
    });
    it('should have statusCode 200', () => {
      expect(statusCode).toBe(200);
    });
  });

  describe('with valid query params', () => {
    let server, result, statusCode;
    beforeAll(async () => {
      const requestDefaults = {
        method: 'GET',
        url:
          '/coordinate?location=neuilly-plaisance&page=1&item-per-page=20&sort-by-name=desc',
        payload: {},
      };
      server = await init(3001);
      const data = await server.inject(requestDefaults);
      result = JSON.parse(data.payload);
      statusCode = data.statusCode;
    });
    afterAll(async () => {
      await server.stop();
    });

    it('should have a total', () => {
      expect(typeof result.total).toBe('number');
    });
    it('should have data with 20 elements', () => {
      expect(result.data).toHaveLength(20);
    });
    it('should have links', () => {
      expect(result._links).toBeDefined();
    });
    it('should have statusCode 200', () => {
      expect(statusCode).toBe(200);
    });
  });

  describe('with invalid query params', () => {
    describe('unknown param', () => {
      let server, result, statusCode;
      beforeAll(async () => {
        const requestDefaults = {
          method: 'GET',
          url: '/coordinate?hadoken=boom',
          payload: {},
        };
        server = await init(3001);
        const data = await server.inject(requestDefaults);
        result = JSON.parse(data.payload);
        statusCode = data.statusCode;
      });
      afterAll(async () => {
        await server.stop();
      });

      it('should return an error', () => {
        const expectedResult = {
          statusCode: 400,
          error: 'Bad Request',
          message: 'Invalid request query input',
        };
        expect(result).toEqual(expectedResult);
      });
      it('should have data with 20 elements', () => {
        expect(statusCode).toBe(400);
      });
    });

    describe('invalid param', () => {
      describe('invalid sort-by-name', () => {
        let server, result, statusCode;
        beforeAll(async () => {
          const requestDefaults = {
            method: 'GET',
            url: '/coordinate?sort-by-name=hadoken',
            payload: {},
          };
          server = await init(3001);
          const data = await server.inject(requestDefaults);
          result = JSON.parse(data.payload);
          statusCode = data.statusCode;
        });
        afterAll(async () => {
          await server.stop();
        });

        it('should return an error', () => {
          const expectedResult = {
            statusCode: 400,
            error: 'Bad Request',
            message: 'Invalid request query input',
          };
          expect(result).toEqual(expectedResult);
        });
        it('should have data with 20 elements', () => {
          expect(statusCode).toBe(400);
        });
      });
      describe('invalid page', () => {
        let server, result, statusCode;
        beforeAll(async () => {
          const requestDefaults = {
            method: 'GET',
            url: '/coordinate?page=0',
            payload: {},
          };
          server = await init(3001);
          const data = await server.inject(requestDefaults);
          result = JSON.parse(data.payload);
          statusCode = data.statusCode;
        });
        afterAll(async () => {
          await server.stop();
        });

        it('should return an error', () => {
          const expectedResult = {
            statusCode: 400,
            error: 'Bad Request',
            message: 'Invalid request query input',
          };
          expect(result).toEqual(expectedResult);
        });
        it('should have data with 20 elements', () => {
          expect(statusCode).toBe(400);
        });
      });
      describe('invalid item-per-page', () => {
        let server, result, statusCode;
        beforeAll(async () => {
          const requestDefaults = {
            method: 'GET',
            url: '/coordinate?item-per-page=0',
            payload: {},
          };
          server = await init(3001);
          const data = await server.inject(requestDefaults);
          result = JSON.parse(data.payload);
          statusCode = data.statusCode;
        });
        afterAll(async () => {
          await server.stop();
        });

        it('should return an error', () => {
          const expectedResult = {
            statusCode: 400,
            error: 'Bad Request',
            message: 'Invalid request query input',
          };
          expect(result).toEqual(expectedResult);
        });
        it('should have data with 20 elements', () => {
          expect(statusCode).toBe(400);
        });
      });
    });
  });
});
