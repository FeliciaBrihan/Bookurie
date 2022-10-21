import { Server } from 'http';
import { expressModule } from 'src/core';
import { setSocket } from 'src/global';

export function initSocketServer(httpServer: Server) {
	const { getServerConnection } = expressModule();

	const socket = getServerConnection(httpServer, {
		allowOrigins: ['http://localhost:3000', 'http://localhost:5000'],
	});
	setSocket(socket);
}
