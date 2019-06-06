import {createServer} from './server';

async function main() {
    const server = await createServer();
    await server.start();

    console.log(`Server running on ${server.info.uri}`);
}

main();
