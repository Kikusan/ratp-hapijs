import { Server, ServerRegisterPluginObject } from "@hapi/hapi";
import * as HapiSwagger from 'hapi-swagger';
import * as Vision from '@hapi/vision';
import * as Inert from '@hapi/inert';

import "dotenv/config";

import coordinateRoute from './coordinate/coordinate.route'
const init = async () => {
    const server: Server = new Server({
        port: process.env.PORT,
        host: 'localhost'
    });
    const swaggerOptions: HapiSwagger.RegisterOptions = {
        info: {
            title: 'Test API Documentation'
        }
    };

    const plugins: Array<ServerRegisterPluginObject<any>> = [
        {
            plugin: Inert
        },
        {
            plugin: Vision
        },
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ];
    await server.register(plugins);
    server.route([...coordinateRoute]);
    await server.start();
    console.log('Server running on %s', server.info.uri);
};
process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});
init();