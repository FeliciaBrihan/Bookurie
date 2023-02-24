import JWT from 'jsonwebtoken';
import { ModelUser } from 'src/interface';

export function generateJWT(user: ModelUser) {
	return JWT.sign({ user }, process.env.JWT_ACCESS_KEY, {
		expiresIn: process.env.JWT_ACCESS_KEY_EXPIRE_TIME,
	});
}
