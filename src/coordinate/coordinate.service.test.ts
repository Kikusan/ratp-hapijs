import makecoordinateService from './coordinate.service'
describe("coordinateService", () => {
    let coordinateService;
    let coordinateProvider;
    let result;

    describe("get", () => {
        const dataSample = {
            nhits: 20,
            parameters: {
                dataset: "positions-geographiques-des-stations-du-reseau-ratp",
                timezone: "UTC",
                q: "neuilly-plaisance rer",
                rows: 10,
                start: 0,
                format: "json",
                facet: ["stop_name"],
            },
            records: [
                {
                    datasetid: "positions-geographiques-des-stations-du-reseau-ratp",
                    recordid: "54f4af08a5f58e355773427e3b7d08072551e6c8",
                    fields: {
                        stop_coordinates: [48.85296447651706, 2.5147940192726432],
                        stop_desc: "22-24 BOULEVARD GALLIENI - 93049",
                        stop_name: "NEUILLY-PLAISANCE RER.",
                        stop_id: "3682834",
                    },
                    geometry: {
                        type: "Point",
                        coordinates: [2.5147940192726432, 48.85296447651706],
                    },
                    record_timestamp: "2019-03-22T10:43:58.103000+00:00",
                },
            ],
        };
        beforeEach(async () => {
            coordinateProvider = {
                get: jest.fn(() => Promise.resolve(dataSample)),
            };
            coordinateService = makecoordinateService({ coordinateProvider });
            const params = {
                location: 'neuilly-plaisance',
                page: 2,
                itemPerPage: 5,
                sortByName: 'desc'
            }
            result = await coordinateService.get(params);
        });
        it("should call coordinateProvider.get() with the correct params", () => {
            const expectedQuery = '&q=neuilly-plaisance&rows=5&start=5&sort=-stop_name'
            expect(coordinateProvider.get).toHaveBeenCalledWith(expectedQuery);
        });
        it("should return array of coordinates", () => {
            const exprectedResult = {
                data: [
                    {
                        name: "NEUILLY-PLAISANCE RER.",
                        coordinates: [48.85296447651706, 2.5147940192726432],
                        id: "3682834",
                        description: "22-24 BOULEVARD GALLIENI - 93049",
                    }],
                _links: {
                    current: "undefined/coordinate?location=neuilly-plaisance&page=2&item-per-page=5&sort-by-name=desc",
                    next: "undefined/coordinate?location=neuilly-plaisance&page=3&item-per-page=5&sort-by-name=desc",
                    previous: "undefined/coordinate?location=neuilly-plaisance&page=1&item-per-page=5&sort-by-name=desc",
                }

            };
            expect(result).toEqual(exprectedResult);
        });
    });
});
