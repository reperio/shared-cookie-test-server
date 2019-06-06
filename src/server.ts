import {Server, Request, RequestEvent, ResponseToolkit} from '@hapi/hapi';
import {config} from './config';
import {appLogger} from './log';
import {IServerApplicationState} from './types/serverApplicationState';

export async function createServer() {
    const server = new Server({
        port: config.port,
        host: config.host
    });

    return server;
}
