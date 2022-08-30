import JWT from 'jsonwebtoken';

export function generateJWT(currentUserId = 0) {
	return JWT.sign({ currentUserId }, process.env.JWT_LOCAL_KEY, {
		expiresIn: process.env.JWT_LOCAL_KEY_EXPIRE_TIME,
	});
}
