import { Sequelize } from 'sequelize';
// import { pool } from 'workerpool';
import { Server as SocketServer } from 'socket.io';
import _axios from 'axios';

// export const workerPool = pool({ minWorkers: 2, workerType: 'thread' });
export const axios = {
	local: _axios.create({
		baseURL: process.env.DOMAIN,
	}),
};

export let sequelize: Sequelize;
export let socket: SocketServer;

export function setSequelize(val: Sequelize) {
	sequelize = val;
}

export function setSocket(val: SocketServer) {
	socket = val;
}
