import {Server, Request, RequestEvent, ResponseToolkit} from '@hapi/hapi';
import {config} from './config';
import {routes} from './routes';
import {appLogger} from './log';
import {IServerApplicationState} from './types/serverApplicationState';

export async function createServer() {
    const server = new Server({
        port: config.port,
        host: config.host,
        routes: {
            cors: {
                origin: ['*.sharedcookietest.com'],
                credentials: true
            }
        }
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
        path: '/',
        domain: 'sharedcookietest.com',
        encoding: 'none'
    });

    server.route({
        method: 'OPTIONS',
        path: '/{p*}',
        options: {
            auth: false,
            cors: false
        },
        handler: (req, h) => {
            const response = h.response('success');

            const origin = req.headers.origin;

            if (origin) {
                response.header('Access-Control-Allow-Origin', origin);
            }

            response.type('text/plain');
            response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            response.header('Access-Control-Allow-Credentials', 'true');
            response.header('Access-Control-Allow-Headers', 'Content-Type, *');
            return response;
        }
    })

    server.route(routes);

    return server;
}
