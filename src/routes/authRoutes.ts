import Joi from '@hapi/joi';
import {ServerRoute} from '@hapi/hapi';

export const routes: ServerRoute[] = [
    {
        method: 'GET',
        path: '/auth',
        handler: async (request, h) => {
            return {
                username: 'person'
            }
        }
    },
    {
        method: 'POST',
        path: '/auth',
        options: {
            auth: false,
            validate: {
                payload: {
                    username: Joi.string().required(),
                    password: Joi.string().required()
                }
            }
        },
        handler: async (request, h) => {
            const payload = request.payload as {username: string, password: string};

            if (payload.username === 'user' && payload.password === 'password') {
                const cookie = {
                    username: 'user',
                    loginDate: (new Date()).toISOString()
                };
                const base64cookie = new Buffer(JSON.stringify(cookie)).toString('base64');
                return h.response('')
                    .code(204)
                    // .state('auth', cookie)
                    .state('auth', base64cookie);
            } else {
                return h.response('')
                    .code(401);
            }
        }
    },
    {
        method: 'DELETE',
        path: '/auth',
        handler: async (request, h) => {
            return h.response('').code(204);
        }
    }
];
