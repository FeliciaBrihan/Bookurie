import './env.js';

import { Sequelize } from 'sequelize';
import { pool } from 'workerpool';
import { Server as SocketServer } from 'socket.io';
import _axios from 'axios';

export const workerPool = pool({ miniWorkers: 2, workerType: 'thread' });
export const axios = {
	local: _axios.create({
		baseURL: process.env.DOMAIN,
	}),
};

export let sequelize;
export let socket;

export function setSequelize(val) {
	sequelize = val;
}

export function setSocket(val) {
	sequelize = val;
}
