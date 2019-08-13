import {Server, Request, RequestEvent, ResponseToolkit} from '@hapi/hapi';
import {config} from './config';
import {routes} from './routes';
import {appLogger} from './log';
import {IServerApplicationState} from './types/serverApplicationState';

export async function createServer() {
    const server = new Server({
        port: config.port,
        host: config.host
    });

    await server.register(require('hapi-auth-jwt2'));

    server.auth.strategy('jwt', 'jwt', {
        key: config.jwtSecret,
        validate: (decodedToken: any) => {
            return { isValid: true };
        },
        verifyOptions: { algorithms: [ 'HS256' ] }
    });

    server.state('token', {
        ttl: config.tokenExpiration,
        isSecure: false, // https only; set to true for production deployment
        isHttpOnly: true,
        isSameSite: 'Lax',
        path: null,
        domain: null,
        encoding: 'none'
    });

    server.route(routes);

    return server;
}
