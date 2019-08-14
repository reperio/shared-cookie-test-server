import Joi from '@hapi/joi';
import {ServerRoute} from '@hapi/hapi';
import Jwt from 'jsonwebtoken';

import {config} from '../config';

export const routes: ServerRoute[] = [
    {
        method: 'GET',
        path: '/auth',
        options: {
            auth: 'jwt'
        },
        handler: async (request, h) => {
            return {
                username: 'person'
            }
        }
    },
    {
        method: 'POST',
        path: '/auth-cookie',
        options: {
            auth: false
        },
        handler: async (request, h) => {
            const tokenPayload = {
                username: 'user',
                loginDate: (new Date()).toISOString()
            };
            const token = Jwt.sign(tokenPayload, config.jwtSecret, {
                expiresIn: config.tokenExpiration
            });
            return h.response('')
                .code(204)
                .state('token', token)
                .header('Access-Control-Allow-Credentials', 'true');
        }
    },
    {
        method: 'POST',
        path: '/auth-header',
        options: {
            auth: false
        },
        handler: async (request, h) => {
            const tokenPayload = {
                username: 'user',
                loginDate: (new Date()).toISOString()
            };
            const token = Jwt.sign(tokenPayload, config.jwtSecret, {
                expiresIn: config.tokenExpiration
            });
            return h.response('')
                .code(204)
                .header('Authorization', `Bearer ${token}`);
        }
    },
    {
        method: 'DELETE',
        path: '/auth',
        options: {
            auth: 'jwt'
        },
        handler: async (request, h) => {
            return h.response('')
                .code(204)
                .unstate('token');
        }
    }
];
