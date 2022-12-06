import { NextFunction, Request, Response } from 'express';
import { Models, ModelUser } from 'src/interface';
import { auth, sequelize } from 'src/global';

export async function authorization(
	req: Request<{}, {}, {}, {}> & { currentUser?: ModelUser },
	res: Response,
	next: NextFunction
) {
	try {
		const { User } = sequelize.models as unknown as Models;

		const idToken = req.headers['authorization'] as string;
		if (!idToken) return next();

		const firebaseUser = await auth().verifyIdToken(idToken);

		const user = await User.findOne({
			where: { email: firebaseUser.email },
		});
		if (user === null) return next();

		req.currentUser = user;
		next();
	} catch (error) {
		next();
	}
}
