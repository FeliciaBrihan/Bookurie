import { Response } from 'express';

export function returnError(res: Response, message: string, type = 'error') {
	return res.status(400).send({ [type]: message });
}
