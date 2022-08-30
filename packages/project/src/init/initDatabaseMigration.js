import { exec } from 'child_process';

export function initDatabaseMigration() {
	exec(
        process.env.EXTRA_COMMAND + 'sequelize db:migrate',
		(err, stdout, stderr) => {
			if (err) {
				console.log(err.message); //replaced the logger for the moment
				return;
			}

			// the *entire* stdout and stderr (buffered)
			if (stdout) logger.info(`stdout: ${stdout}`);
			if (stderr) logger.info(`stderr: ${stderr}`);
		}
    );
}
