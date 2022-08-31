import { expressModule } from '../core/expressModule.js';
import { initEachActiveModule } from './initEachActiveModule.js';

export function initExpressModules(app) {
	const { getModules } = expressModule();
	const modules = getModules();

	initEachActiveModule(app, modules);
}
