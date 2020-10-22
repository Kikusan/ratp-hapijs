import { FakeResponse, FakeRequest } from "../utils/test.utils";
import makeCoordinateController from "./coordinate.controller";

describe("Coordinate Controller", () => {
    let request, responseTK;
    let coordinateController;
    let coordinateService;
    let next;
    let error;

    describe("get", () => {
        describe("when success", () => {
            beforeEach(async () => {
                request = new FakeRequest({
                    query: {},
                });
                responseTK = new FakeResponse();
                coordinateService = {
                    get: jest.fn(() => Promise.resolve([{}, {}])),
                };
                coordinateController = makeCoordinateController({
                    coordinateService,
                });
                const result = await coordinateController.get(request, responseTK);
            });
            describe("no params", () => {
                it("should call coordinateService.get", () => {
                    expect(coordinateService.get).toHaveBeenCalled();
                });
                it("should return status 200", () => {
                    expect(responseTK.status).toEqual(200);
                });
                it("should return an array of coordinates", () => {
                    expect(responseTK.content).toEqual([{}, {}]);
                });
            });
            describe("with params", () => {
                beforeEach(() => {
                    request = new FakeRequest({
                        query: {
                            location: "neuilly-plaisance",
                            "sort-by-name": "desc",
                            page: 2,
                            "item-per-page": 20,
                        },
                    });
                    coordinateController.get(request, responseTK);
                });
                it("should call coordinateService.get", () => {
                    expect(coordinateService.get).toHaveBeenCalledWith({
                        location: "neuilly-plaisance",
                        sortByName: "desc",
                        page: 2,
                        itemPerPage: 20,
                    });
                });
            });
        });
        describe("when failed", () => {
            beforeEach(() => {
                error = new Error('lol');
                coordinateService = {
                    get: jest.fn(() => Promise.reject(error)),
                };
                next = jest.fn();
                coordinateController = makeCoordinateController({ coordinateService });
                coordinateController.get(request, responseTK);
            });
            it("should return status 400", () => {
                expect(responseTK.status).toEqual(400);
            });
            it("should return the error message", () => {
                expect(responseTK.content).toEqual('lol');
            });
        });
    });
});
