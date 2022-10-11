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

type ReqBodyPurchase = Pick<Purchase, 'BookId' | 'UserId'>;

@Route('purchase')
@Tags('Purchase')
@Security('jwt-auth')
export class PurchaseController extends Controller {
	/**
	 * @summary Get all purchases
	 */
	@Get('/all')
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
	 * @param id The purchase identifier
	 */
	@Get()
	@Security('jwt-auth')
	public async getByUserId(): Promise<Purchase> {
		return {
			BookId: 0,
			UserId: 0,
		};
	}
	/**
	 * @summary Create new purchase
	 */
	@Post()
	@Security('jwt-auth')
	public async create(
		@Body()
		requestBody: ReqBodyPurchase
	): Promise<Purchase> {
		return {
			BookId: 0,
			UserId: 0,
		};
	}

	
}
