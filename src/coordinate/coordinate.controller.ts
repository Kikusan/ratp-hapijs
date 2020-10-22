import { Request, ResponseToolkit } from "@hapi/hapi";
export default function makeCoordinateController({ coordinateService = undefined } = {}) {
    if (!coordinateService) {
        throw new Error("CoordinateController");
    }
    const api = {
        get: async (request: Request, responseTK: ResponseToolkit) => {
            const params = {
                location: request.query.location,
                page: request.query.page,
                itemPerPage: request.query["item-per-page"],
                sortByName: request.query["sort-by-name"],
            };
            try {
                const data = await coordinateService.get(params);
                return responseTK.response(data).code(200)
            } catch (error) {
                return responseTK.response(error.message).code(400)
            }
        },
    };

    return api;
}


