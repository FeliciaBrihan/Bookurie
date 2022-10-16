import JWT from 'jsonwebtoken';
import { ModelUser } from '../interface';
import '../env';

export function generateJWT(user: ModelUser) {
	return JWT.sign({ user }, process.env.JWT_LOCAL_KEY, {
		expiresIn: process.env.JWT_LOCAL_KEY_EXPIRE_TIME,
	});
}
