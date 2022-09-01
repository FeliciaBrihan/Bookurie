import { exec } from 'child_process';
import { loggerOnlyGlobal } from '../logs/index.js';

import url from 'url';
const __filename = url.fileURLToPath(import.meta.url);

const logger = loggerOnlyGlobal(__filename);

export function initDatabaseMigration() {
	exec(
		process.env.EXTRA_COMMAND + 'sequelize db:migrate',
		(err, stdout, stderr) => {
			if (err) {
				logger.info(err.message); //replaced the logger for the moment
				return;
			}

			// the *entire* stdout and stderr (buffered)
			if (stdout) logger.info(`stdout: ${stdout}`);
			if (stderr) logger.info(`stderr: ${stderr}`);
		}
	);
}
