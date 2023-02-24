import { Request, Response } from 'express';
import { sequelize } from 'src/global';
import { errorMessage } from 'src/helpers';
import { ModelPermission, Models } from 'src/interface';

export async function getAll(
	req: Request,
	res: Response<ModelPermission[] | object>
) {
	const { Permission } = sequelize.models as unknown as Models;

	try {
		const permissions = await Permission.findAll();
		if (permissions.length === 0) return res.sendStatus(204);

		return res.status(200).json({
			results: permissions.length,
			data: permissions,
		});
	} catch (error) {
		const message = errorMessage(error);
		res.status(400).send(message);
	}
}
