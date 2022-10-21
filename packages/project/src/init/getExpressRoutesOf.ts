import { expressModule, ModuleInstance } from 'src/core';
import { Express } from 'express';

export async function getExpressRoutesOf(
	moduleInstance: ModuleInstance,
	app: Express
) {
	const { addExpressRouterToApp } = expressModule();
	const { haveExpressRoutes, getExpressRoutes } = moduleInstance;
	if (haveExpressRoutes) {
		addExpressRouterToApp(app, await getExpressRoutes());
	}
}
``;
