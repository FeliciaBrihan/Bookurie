import { expressModule } from '../core/expressModule.js';

export default async function getExpressRoutesOf(moduleInstance, app) {
	const { addExpressRouterToApp } = expressModule();
	const { haveExpressRoutes, getExpressRoutes } = moduleInstance;
	if (haveExpressRoutes) {
		addExpressRouterToApp(app, await getExpressRoutes());
	}
}
``;
