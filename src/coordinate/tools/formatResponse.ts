import { ParamModel } from '../model/param.model';
import { RecordModel } from '../model/record.model';
import { ResponseModel } from '../model/response.model';
export function formatResponse(data, params): ResponseModel {
    return {
        total: data.nhits,
        data: formatDataRecord(data.records),
        _links: createLinkObject(data.nhits, params)
    }
}


function formatDataRecord(data): RecordModel[] {
    return data.map((record) => ({
        name: record.fields && record.fields.stop_name,
        coordinates: record.fields && record.fields.stop_coordinates,
        id: record.fields && record.fields.stop_id,
        description: record.fields && record.fields.stop_desc,
    }));
}



function createLinkObject(hits: number, params: ParamModel) {
    return {
        current: generateLink(hits, params),
        previous: generateLink(hits, params, 'previous'),
        next: generateLink(hits, params, 'next'),
        first: generateLink(hits, params, 'first'),
        last: generateLink(hits, params, 'last'),
    }

};
function generateLink(hits, { location, page, itemPerPage, sortByName }, option?: string) {
    const coordinateRoute = `${process.env.BASE_URL}/coordinate?`;
    const locationParam = location ? `location=${location}` : ''
    const sortByNameParam = sortByName ? `&sort-by-name=${sortByName}` : '';
    const itemPerPageParam = itemPerPage ? `&item-per-page=${itemPerPage}` : '';
    const lastPage = Math.ceil(hits / itemPerPage);
    switch (option) {
        case 'first':
            page = 1;
            break;
        case 'last':
            page = lastPage;
            break;
        case 'previous':
            if (!page || page < 2) {
                return
            }
            page = page - 1
            break;
        case 'next':
            if (!page) {
                page = 2;
            } else if (page < lastPage) {
                page = page + 1;
            } else {
                return
            }
            break;
    }
    const pageParam = `&page=${page}`;
    return `${coordinateRoute}${locationParam}${pageParam}${itemPerPageParam}${sortByNameParam}`
}