import { expressModule, ModuleInstance } from '../core/index';
import { Express } from 'express';

export default async function getExpressRoutesOf(
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
