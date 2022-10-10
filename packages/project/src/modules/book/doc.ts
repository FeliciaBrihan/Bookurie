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
import { Book } from '../../interface';

type ReqBodyBook = Pick<
	Book,
	| 'title'
	| 'author'
	| 'publishedYear'
	| 'coverImage'
	| 'genre'
	| 'description'
	| 'typeFormat'
	| 'pages'
	| 'price'
	| 'stock'
>;

@Route('books')
@Tags('Book')
export class BookController extends Controller {
	/**
	 * @summary Get all Books
	 */
	@Get()
	public async getAll(): Promise<Book[]> {
		return [
			{
				title: '',
				author: '',
				publishingHouse: '',
				publishedYear: 0,
				coverImage: '',
				genre: '',
				description: '',
				typeFormat: '',
				pages: 0,
				price: 0,
				stock: 0,
			},
		];
	}

	/**
	 * @summary Get book by ID
	 * @param id The book identifier
	 */
	@Get('{id}')
	@Security('jwt-auth')
	public async getById(@Path() id: number): Promise<Book> {
		return {
			title: '',
			author: '',
			publishingHouse: '',
			publishedYear: 0,
			coverImage: '',
			genre: '',
			description: '',
			typeFormat: '',
			pages: 0,
			price: 0,
			stock: 0,
		};
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
		return {
			title: '',
			author: '',
			publishingHouse: '',
			publishedYear: 0,
			coverImage: '',
			genre: '',
			description: '',
			typeFormat: '',
			pages: 0,
			price: 0,
			stock: 0,
		};
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
		return {
			title: '',
			author: '',
			publishingHouse: '',
			publishedYear: 0,
			coverImage: '',
			genre: '',
			description: '',
			typeFormat: '',
			pages: 0,
			price: 0,
			stock: 0,
		};
	}

	/**
	 * @summary Delete book by Id
	 * @param id The book identifier
	 */
	@Delete('{id}')
	@Security('jwt-auth')
	public async delete(@Path() id: number): Promise<Book> {
		return {
			title: '',
			author: '',
			publishingHouse: '',
			publishedYear: 0,
			coverImage: '',
			genre: '',
			description: '',
			typeFormat: '',
			pages: 0,
			price: 0,
			stock: 0,
		};
	}
}
