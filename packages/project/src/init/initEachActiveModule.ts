import { expressModule } from '../core/expressModule';
import getExpressRoutesOf from './getExpressRoutesOf';
import { Express } from 'express';
import { getCronsOf } from './getCronsOf';

export async function initEachActiveModule(app: Express, modules: string[]) {
	for (const module of modules) {
		const moduleInstance = expressModule().getInstanceOfModule(module);

		await getExpressRoutesOf(moduleInstance, app);
		getCronsOf(moduleInstance);
	}
}
