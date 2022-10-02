import { Request, Response, NextFunction } from 'express';
import { ExtraRequest, User, Models } from '../../../interface';
import JWT from 'jsonwebtoken';
import '../../../env';

type JWTResponse<T> = (string | JWT.JwtPayload) & T;

export async function verifyToken(
	req: Request & ExtraRequest,
	res: Response,
	next: NextFunction
) {
	const { sequelize } = await import('../../../global');

	const { User } = sequelize.models as unknown as Models;

	const token = req.headers['authorization'];

	if (typeof token !== 'undefined') {
		const jwt = token.split(' ')[1];

		try {
			const decodedJWT = JWT.verify(jwt, process.env.JWT_ACCESS_KEY) as {
				user: User;
			};
			const user = await User.findOne({
				where: { id: decodedJWT.user.id },
			});

			req.currentUserId = user.id;
			req.currentUser = user;
			req.currentUserRoleId = user.roleId;
			next();
		} catch (error: any) {
			res.status(403).send({ error: 'invalid token' });
		}
	} else if (typeof req.headers['local-auth'] === 'string') {
		try {
			const jwt = req.headers['local-auth'];
			const decodedJWT = JWT.verify(
				jwt,
				process.env.JWT_LOCAL_KEY
			) as JWTResponse<{ currentUserId: number }>;

			if (decodedJWT.currentUserId !== 0)
				req.currentUserId = decodedJWT.currentUserId;
			next();
		} catch (error: any) {
			return res.sendStatus(403);
		}
	} else {
		res.sendStatus(403);
	}
}