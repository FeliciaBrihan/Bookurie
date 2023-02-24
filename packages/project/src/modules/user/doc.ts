/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	Controller,
	Get,
	Path,
	Route,
	Tags,
	Post,
	Body,
	Put,
	Delete,
	Security,
} from 'tsoa';
import { Loan, Purchase, Raffle, User } from 'src/interface';

type ReqBody = Omit<User, 'createdAt' | 'updatedAt' | 'deletedAt' | 'id'>;

@Route('user')
@Tags('User')
export class UserController extends Controller {
	/**
	 * @summary Get all Users
	 */
	@Get()
	@Security('jwt-auth')
	public async getAll(): Promise<Omit<User, 'password'>[]> {
		return;
	}

	/**
	 * @summary Get user by ID
	 * @param id The user identifier
	 */
	@Get('{id}')
	@Security('jwt-auth')
	public async getById(@Path() id: number): Promise<User> {
		return;
	}

	/**
	 * @summary Create new user by admin
	 */
	@Post()
	@Security('jwt-auth')
	public async create(
		@Body()
		requestBody: ReqBody
	): Promise<User> {
		return;
	}

	/**
	 * @summary Create new user
	 */
	@Post('/signup')
	public async signUp(
		@Body()
		requestBody: ReqBody
	): Promise<{ accessToken: string }> {
		return { accessToken: '' };
	}

	/**
	 * @summary Update user by ID
	 * @param id The user identifier
	 */
	@Put('{id}')
	@Security('jwt-auth')
	public async update(
		@Path() id: number,
		@Body() requestBody: ReqBody
	): Promise<User> {
		return;
	}

	/**
	 * @summary Delete user by ID
	 * @param id The user identifier
	 */
	@Delete('{id}')
	@Security('jwt-auth')
	public async delete(@Path() id: number): Promise<User> {
		return;
	}

	/**
	 * @summary Change user role
	 * @param userId The user identifier
	 */
	@Put('{userId}/changeRole')
	@Security('jwt-auth')
	public async changeRole(
		@Path() userId: number,
		@Body() requestBody: ReqBody
	): Promise<User> {
		return;
	}

	/**
	 * @summary User history
	 */
	@Get('history')
	@Security('jwt-auth')
	public async history(): Promise<{
		data: {
			loans: Loan[];
			purchases: Purchase[];
			raffleWins: Raffle[];
		};
	}> {
		return;
	}
}
