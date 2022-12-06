import { NextFunction, Request, Response } from 'express';
import { ModelUser } from 'src/interface';

export async function googleAuth(
	req: Request & { currentUser: ModelUser },
	res: Response,
	next: NextFunction
) {
	if (req?.currentUser) {
		next();
	} else {
		res.sendStatus(403);
	}
}
