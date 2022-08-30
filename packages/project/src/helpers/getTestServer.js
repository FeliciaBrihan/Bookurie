import supertest from 'supertest';
import startServer from '../server';

export async function getTestServer() {
	process.env.ENVIRONMENT = 'TEST';
	const server = await startServer();
	return supertest(server);
}
