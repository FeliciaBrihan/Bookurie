import './env.js';

import { pool } from 'workerpool';
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
	socket = val;
}
