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
import { Permission } from 'src/interface';

type ReqBodyPermission = Omit<
	Permission,
	'createdAt' | 'updatedAt' | 'deletedAt' | 'id'
>;

@Route('permission')
@Tags('Permission')
export class PermissionController extends Controller {
	/**
	 * @summary Get all permissions
	 */
	@Get()
	@Security('jwt-auth')
	public async getAll(): Promise<Permission[]> {
		return;
	}

	/**
	 * @summary Create new permission
	 */
	@Post()
	@Security('jwt-auth')
	public async create(
		@Body()
		requestBody: ReqBodyPermission
	): Promise<Permission> {
		return;
	}

	/**
	 * @summary Update permission by Id
	 * @param id The permission identifier
	 */
	@Put('{id}')
	@Security('jwt-auth')
	public async update(
		@Path() id: number,
		@Body() requestBody: ReqBodyPermission
	): Promise<Permission> {
		return;
	}

	/**
	 * @summary Delete permission by Id
	 * @param id The permission identifier
	 */
	@Delete('{id}')
	@Security('jwt-auth')
	public async delete(@Path() id: number): Promise<Permission> {
		return;
	}
}
