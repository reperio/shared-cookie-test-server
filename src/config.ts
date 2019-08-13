export const config = {
    host: process.env.HOST || '0.0.0.0',
    port: parseInt(process.env.port || '3000'),
    jwtSecret: process.env.JWT_SECRET || 'LcSklTaazWiRF7hU4FzxO6GkLOyFxdNlt1ELWM0isca8lwa1eMyrPB7EhX6e0h97',
    tokenExpiration: 1000 * 60 * 60 * 24,
    logLevel: 'info',
    logDirectory: './logs'
};