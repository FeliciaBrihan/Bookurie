import JWT from 'jsonwebtoken';
import '../env';

export function generateJWT(currentUserId = 0) {
	return JWT.sign({ currentUserId }, process.env.JWT_LOCAL_KEY, {
		expiresIn: process.env.JWT_LOCAL_KEY_EXPIRE_TIME,
	});
}
