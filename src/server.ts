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

    server.route(routes);

    server.state('auth', {
        ttl: 1000 * 60 * 60 * 24,
        isSecure: false, // https only; set to true for production deployment
        isHttpOnly: true,
        isSameSite: 'Lax',
        path: null,
        domain: null,
        encoding: 'none',
        // encoding: 'base64json',
        // sign: {
        //     password: 'NQ97k97UBakjMrFjMp53dD5UWM5SJHKd'
        // }
    });

    return server;
}
