/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Route, Tags, Post, Body } from 'tsoa';
import { User } from 'src/interface';
type ReqBodyAuth = Pick<User, 'username' | 'password'>;

@Route('auth/login')
@Tags('Auth')
export class AuthController extends Controller {
	/**
	 * @summary User login
	 */
	@Post()
	public async create(
		@Body()
		requestBody: ReqBodyAuth
	): Promise<{ accessToken: string }> {
		return;
	}
}
