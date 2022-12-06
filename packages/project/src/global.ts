import { Sequelize } from 'sequelize';
// import { pool } from 'workerpool';
import { Server as SocketServer } from 'socket.io';
import _axios from 'axios';
import firebaseServer from 'src/service/firebaseServer';
import firebaseClient from 'src/service/firebaseClient';

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

export const auth = firebaseServer.auth;
export const firebase = firebaseClient;
