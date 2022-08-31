import { Server } from 'http';
import { expressModule } from '../core/expressModule.js';
import { setSocket } from '../global.js';

export function initSocketServer(httpServer) {
	const { getServerConnection } = expressModule();

	const socket = getServerConnection(httpServer, {
		allowOrigins: ['http://localhost:3000', 'http://localhost:5000'],
	});
	setSocket(socket);
}
