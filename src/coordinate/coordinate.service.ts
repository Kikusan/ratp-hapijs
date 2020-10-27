import { ParamModel } from './model/param.model';
import { ResponseModel } from './model/response.model';
import { createQuery, formatResponse } from './tools';
export default function makeBoredService({
  coordinateProvider = undefined,
} = {}) {
  if (!coordinateProvider) {
    throw new Error('makeCoordinateService');
  }

  const api = {
    get: async (params: ParamModel): Promise<ResponseModel> => {
      const query = createQuery(params);
      const data = await coordinateProvider.get(query);
      return formatResponse(data, params);
    },
  };
  return api;
}
