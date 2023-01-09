import { NextFunction, Request, Response } from 'express';
import { Models, ModelUser } from 'src/interface';
import { auth, sequelize } from 'src/global';
import { generateUserBudget } from 'src/modules/user/functions';

export async function authorization(
	req: Request<{}, {}, {}, {}> & {
		currentUser?: ModelUser;
		currentUserId?: number;
	},
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
		if (user === null) {
			const newUser = await User.create({
				email: firebaseUser.email,
				roleId: 1,
				firstName: firebaseUser.name.split(' ')[0],
				lastName: firebaseUser.name.split(' ')[1],
				username: firebaseUser.name,
				password: 'password123', // to be deleted in model
				budget: generateUserBudget(
					+process.env.MIN_BUDGET,
					+process.env.MAX_BUDGET
				),
			});
			req.currentUser = newUser;
			req.currentUserId = newUser.id;
			next();
		}
		req.currentUser = user;
		req.currentUserId = user.id;
		next();
	} catch (error) {
		next();
	}
}
