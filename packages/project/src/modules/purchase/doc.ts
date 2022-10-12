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
import { Purchase } from '../../interface';

@Route('')
@Tags('Purchase')
@Security('jwt-auth')
export class PurchaseController extends Controller {
	/**
	 * @summary Get all purchases
	 */
	@Get('purchase/all')
	@Security('jwt-auth')
	public async getAll(): Promise<Purchase[]> {
		return [
			{
				BookId: 0,
				UserId: 0,
			},
		];
	}

	/**
	 * @summary Get purchases by user

	 */
	@Get('purchase')
	@Security('jwt-auth')
	public async getByUserId(): Promise<Purchase> {
		return {
			BookId: 0,
			UserId: 0,
		};
	}
	/**
	 * @summary Create new purchase
	 * @param bookId The book identifier
	 */
	@Post('books/{bookId}/purchase')
	@Security('jwt-auth')
	public async create(
		@Path() bookId: number,
	): Promise<Purchase> {
		return {
			BookId: 0,
			UserId: 0,
		};
	}
}
