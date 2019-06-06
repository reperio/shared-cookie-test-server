import {ServerRoute} from '@hapi/hapi';

import {routes as authRoutes} from './authRoutes';

export const routes: ServerRoute[] = [
    ...authRoutes
];
