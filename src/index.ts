import { Server } from "@hapi/hapi";
import "dotenv/config";

import coordinateRoute from './coordinate/coordinate.route'
const init = async () => {
    const server: Server = new Server({
        port: process.env.PORT,
        host: 'localhost'
    });
    server.route([...coordinateRoute]);
    await server.start();
    console.log('Server running on %s', server.info.uri);
};
process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});
init();