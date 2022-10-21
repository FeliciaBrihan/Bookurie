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
import { Action } from 'src/interface';

type ReqBodyAction = Pick<Action, 'name'>;

@Route('action')
@Tags('Action')
export class ActionController extends Controller {
	/**
	 * @summary Get all actions
	 */
	@Get()
	@Security('jwt-auth')
	public async getAll(): Promise<Action[]> {
		return;
	}

	/**
	 * @summary Create new action
	 */
	@Post()
	@Security('jwt-auth')
	public async create(
		@Body()
		requestBody: ReqBodyAction
	): Promise<Action> {
		return;
	}

	/**
	 * @summary Update action by Id
	 * @param id The action identifier
	 */
	@Put('{id}')
	@Security('jwt-auth')
	public async update(
		@Path() id: number,
		@Body() requestBody: ReqBodyAction
	): Promise<Action> {
		return;
	}

	/**
	 * @summary Delete action by Id
	 * @param id The action identifier
	 */
	@Delete('{id}')
	@Security('jwt-auth')
	public async delete(@Path() id: number): Promise<Action> {
		return;
	}
}
