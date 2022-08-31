import { expressModule } from '../core/expressModule.js';
import getExpressRoutesOf from './getExpressRoutesOf.js';
export async function initEachActiveModule(app, modules) {
	for (const module of modules) {
		const moduleInstance = expressModule().getInstanceOfModule(module);

		await getExpressRoutesOf(moduleInstance, app);
		// getCronsOf(moduleInstance);
	}
}
