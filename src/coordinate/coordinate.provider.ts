import { ParamModel } from './model/param.model';

export default function makeCoordinateProvider({ fetch = undefined } = {}) {
    if (!fetch) {
        throw new Error("makeCoordinateProvider");
    }

    const api = {
        get: async (params: ParamModel): Promise<JSON> => {
            const query = createquery(params);
            const response = await fetch(`${process.env.RATP_API}${query}`);
            const result = response.json();
            if (response.status === 200) {
                return result;
            }
            throw new Error(result);
        },
    };

    return api;
}


const createquery = ({ location, page, itemPerPage, sortByName }): String => {
    let query = "";
    if (location) {
        const formattedLocation = location.replace(/ /g, "+");
        query += `&q=${formattedLocation}`;
    }

    if (itemPerPage && !isNaN(itemPerPage)) {
        query += `&rows=${itemPerPage}`;
    }

    if (!isNaN(page) && !isNaN(itemPerPage) && page > 0) {
        query += `&start=${(page - 1) * itemPerPage}`;
    }

    if (sortByName) {
        const sortValue = sortByName === "desc" ? "-stop_name" : "stop_name";
        query += `&sort=${sortValue}`;
    }
    return query;
};
