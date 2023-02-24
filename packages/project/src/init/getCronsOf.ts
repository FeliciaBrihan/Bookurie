import { ModuleInstance } from 'src/core';

export function getCronsOf(moduleInstance: ModuleInstance) {
	const { haveCrons, startCronSchedule } = moduleInstance;

	if (haveCrons) startCronSchedule();
}
