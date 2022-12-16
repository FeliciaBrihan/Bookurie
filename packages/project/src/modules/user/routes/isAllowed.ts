import { Request, Response } from 'express';
import { ModelUser } from 'src/interface';
import { errorMessage } from 'src/helpers';

export async function isAllowed(
	req: Request<{}, {}, {}, {}> & { currentUser: ModelUser },
	res: Response
) {
	try {
		if (req?.currentUser) return res.send({ loggedUser: req.currentUser });
	} catch (error) {
		const message = errorMessage(error);
		return res.status(400).send(message);
	}
}
