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
import { Book } from 'src/interface';

type ReqBodyBook = Omit<Book, 'createdAt' | 'updatedAt' | 'deletedAt' | 'id'>;

@Route('book')
@Tags('Book')
export class BookController extends Controller {
	/**
	 * @summary Get all Books
	 */
	@Get()
	public async getAll(): Promise<Book[]> {
		return;
	}

	/**
	 * @summary Get book by ID
	 * @param id The book identifier
	 */
	@Get('{id}')
	@Security('jwt-auth')
	public async getById(@Path() id: number): Promise<Book> {
		return;
	}

	/**
	 * @summary Create new book
	 */
	@Post()
	@Security('jwt-auth')
	public async create(
		@Body()
		requestBody: ReqBodyBook
	): Promise<Book> {
		return;
	}

	/**
	 * @summary Update book by Id
	 * @param id The book identifier
	 */
	@Put('{id}')
	@Security('jwt-auth')
	public async update(
		@Path() id: number,
		@Body() requestBody: ReqBodyBook
	): Promise<Book> {
		return;
	}

	/**
	 * @summary Delete book by Id
	 * @param id The book identifier
	 */
	@Delete('{id}')
	@Security('jwt-auth')
	public async delete(@Path() id: number): Promise<Book> {
		return;
	}
}
