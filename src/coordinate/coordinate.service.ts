import { ParamModel } from './model/param.model';
import { RecordModel } from './model/record.model';
export default function makeBoredService({ coordinateProvider = undefined } = {}) {
    if (!coordinateProvider) {
        throw new Error("makeCoordinateService");
    }

    const api = {
        get: async (params: ParamModel): Promise<RecordModel[]> => {
            const data = await coordinateProvider.get(params);
            return formatData(data.records);
        },
    };

    return api;
};


const formatData = (data): RecordModel[] => {
    return data.map((record) => ({
        name: record.fields && record.fields.stop_name,
        coordinates: record.fields && record.fields.stop_coordinates,
        id: record.fields && record.fields.stop_id,
        description: record.fields && record.fields.stop_desc,
    }));
}