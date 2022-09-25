import { expressModule } from '../core/expressModule';
import { initEachActiveModule } from './initEachActiveModule';
import { Express } from 'express';

export function initExpressModules(app: Express) {
	const { getModules } = expressModule();
	const modules = getModules();

	initEachActiveModule(app, modules);
}
