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
import { Role } from 'src/interface';

type ReqBodyRole = Pick<Role, 'name'>;

@Route('role')
@Tags('Role')
export class RoleController extends Controller {
	/**
	 * @summary Get all roles
	 */
	@Get()
	@Security('jwt-auth')
	public async getAll(): Promise<Role[]> {
		return;
	}

	/**
	 * @summary Create new role
	 */
	@Post()
	@Security('jwt-auth')
	public async create(
		@Body()
		requestBody: ReqBodyRole
	): Promise<Role> {
		return;
	}

	/**
	 * @summary Update role by Id
	 * @param id The role identifier
	 */
	@Put('{id}')
	@Security('jwt-auth')
	public async update(
		@Path() id: number,
		@Body() requestBody: ReqBodyRole
	): Promise<Role> {
		return;
	}

	/**
	 * @summary Delete role by Id
	 * @param id The role identifier
	 */
	@Delete('{id}')
	@Security('jwt-auth')
	public async delete(@Path() id: number): Promise<Role> {
		return;
	}
}
