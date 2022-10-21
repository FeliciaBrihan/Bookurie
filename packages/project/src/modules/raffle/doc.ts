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
import { Raffle } from 'src/interface';

@Route('raffle')
@Tags('Raffle')
export class BookController extends Controller {
	/**
	 * @summary Get all raffles
	 */
	@Get()
	@Security('jwt-auth')
	public async getAll(): Promise<Raffle[]> {
		return;
	}
}
