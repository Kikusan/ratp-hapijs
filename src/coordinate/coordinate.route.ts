import fetch from "node-fetch";
import makeCoordinateProvider from "./coordinate.provider";
import makeCoordinateService from "./coordinate.service";
import makeCoordinateController from "./coordinate.controller";

const coordinateProvider = makeCoordinateProvider({ fetch });
const coordinateService = makeCoordinateService({ coordinateProvider });
const coordinateController = makeCoordinateController({ coordinateService });

export default [
    {
        method: 'GET',
        path: '/coordinate',
        handler: coordinateController.get
    }
]