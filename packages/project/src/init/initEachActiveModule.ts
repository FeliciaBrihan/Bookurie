import { expressModule } from 'src/core';
import { getExpressRoutesOf } from 'src/init';
import { Express } from 'express';
import { getCronsOf } from 'src/init';

export async function initEachActiveModule(app: Express, modules: string[]) {
	for (const module of modules) {
		const moduleInstance = expressModule().getInstanceOfModule(module);

		await getExpressRoutesOf(moduleInstance, app);
		getCronsOf(moduleInstance);
	}
}
