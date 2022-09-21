import JWT from 'jsonwebtoken';

export async function verifyToken(req, res, next) {
	const { sequelize } = await import('../../../global.js');

	const { User } = sequelize.models;

	const token = req.headers['authorization'];

	if (typeof token !== 'undefined') {
		const jwt = token.split(' ')[1];

		try {
			const decodedJWT = JWT.verify(jwt, process.env.JWT_ACCESS_KEY);

			const user = await User.findOne({ where: { id: decodedJWT.user.id } });

			req.currentUserId = user.id;
			req.currentUser = user;
			next();
		} catch (err) {
			res.status(403).send({ error: 'invalid token' });
		}
	} else {
		res.sendStatus(403);
	}
}
