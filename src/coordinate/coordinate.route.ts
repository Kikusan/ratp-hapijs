import fetch from 'node-fetch';
import makeCoordinateProvider from './coordinate.provider';
import makeCoordinateService from './coordinate.service';
import makeCoordinateController from './coordinate.controller';
import * as Joi from 'joi';

const coordinateProvider = makeCoordinateProvider({ fetch });
const coordinateService = makeCoordinateService({ coordinateProvider });
const coordinateController = makeCoordinateController({ coordinateService });

export default [
  {
    method: 'GET',
    path: '/coordinate',
    options: {
      handler: coordinateController.get,
      description: 'Get location coordinates',
      notes: 'Returns a list of coordinates regarding your research',
      tags: ['api', 'coordinate'],
      validate: {
        query: Joi.object({
          location: Joi.string().description('your location research'),
          'sort-by-name': Joi.string()
            .valid('asc', 'desc')
            .description('sort the result by name'),
          page: Joi.number().min(1).description('page number'),
          'item-per-page': Joi.number().min(1).description('items per page'),
        }),
      },
      response: {
        schema: Joi.object({
          total: Joi.number().description('total of returned result'),
          data: Joi.array().items(
            Joi.object({
              name: Joi.string().description('your location research'),
              coordinates: Joi.array()
                .items(Joi.number())
                .description('sort the result by name'),
              id: Joi.string().description('page number'),
              description: Joi.string().description('items per page'),
            }),
          ),
          _links: Joi.object({
            first: Joi.string().description('first page url'),
            last: Joi.string().description('last page url'),
            current: Joi.string().description('current url'),
            previous: Joi.string().description('previous page url'),
            next: Joi.string().description('next page url'),
          }),
        }),
      },
    },
  },
];
