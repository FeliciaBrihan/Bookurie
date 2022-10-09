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
import { User } from '../../interface';

type ReqBody = Pick<
	User,
	| 'firstName'
	| 'lastName'
	| 'username'
	| 'password'
	| 'email'
	| 'roleId'
	| 'budget'
	| 'subscriptionId'
	| 'subscriptionDate'
	| 'subscriptionExpirationDate'
	| 'booksReadThisMonth'
>;

@Route('user')
@Tags('User')
export class UserController extends Controller {
	/**
	 * @summary Get all Users
	 */
	@Get()
	@Security('jwt-auth')
	public async getAll(): Promise<Omit<User, 'password'>[]> {
		return [
			{
				firstName: '',
				lastName: '',
				username: '',
				email: '',
				roleId: 0,
				budget: 0,
				subscriptionId: 0,
				subscriptionDate: '' as unknown as Date,
				subscriptionExpirationDate: '' as unknown as Date,
				booksReadThisMonth: 0,
			},
		];
	}

	/**
	 * @summary Get user by ID
	 * @param id The user identifier
	 */
	@Get('{id}')
	public async getById(@Path() id: number): Promise<User> {
		return {
			firstName: '',
			lastName: '',
			username: '',
			email: '',
			password: '',
			roleId: 0,
			budget: 0,
			subscriptionId: 0,
			subscriptionDate: '' as unknown as Date,
			subscriptionExpirationDate: '' as unknown as Date,
			booksReadThisMonth: 0,
		};
	}

	/**
	 * @summary Create new user
	 */
	@Post()
	public async create(
		@Body()
		requestBody: ReqBody
	): Promise<User> {
		return {
			firstName: '',
			lastName: '',
			username: '',
			email: '',
			password: '',
			roleId: 0,
			budget: 0,
			subscriptionId: 0,
			subscriptionDate: '' as unknown as Date,
			subscriptionExpirationDate: '' as unknown as Date,
			booksReadThisMonth: 0,
		};
	}

	/**
	 * @summary Update user by ID
	 * @param id The user identifier
	 */
	@Put('{id}')
	public async update(
		@Path() id: number,
		@Body() requestBody: ReqBody
	): Promise<User> {
		return {
			firstName: '',
			lastName: '',
			username: '',
			email: '',
			password: '',
			roleId: 0,
			budget: 0,
			subscriptionId: 0,
			subscriptionDate: '' as unknown as Date,
			subscriptionExpirationDate: '' as unknown as Date,
			booksReadThisMonth: 0,
		};
	}

	/**
	 * @summary Delete user by ID
	 * @param id The user identifier
	 */
	@Delete('{id}')
	public async delete(@Path() id: number): Promise<User> {
		return {
			firstName: '',
			lastName: '',
			username: '',
			email: '',
			password: '',
			roleId: 0,
			budget: 0,
			subscriptionId: 0,
			subscriptionDate: '' as unknown as Date,
			subscriptionExpirationDate: '' as unknown as Date,
			booksReadThisMonth: 0,
		};
	}
}
