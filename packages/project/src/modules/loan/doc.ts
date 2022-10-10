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
import { Loan } from '../../interface';

type ReqBodyLoan = Pick<Loan, 'BookId' | 'UserId' |'expirationDate'|'isAccepted'|'isReturned'>;

@Route('loan')
@Tags('Loan')
@Security('jwt-auth')
export class LoanController extends Controller {
	/**
	 * @summary Get all Loans
	 */
	@Get()
	public async getAll(): Promise<Loan[]> {
		return [
			{
				isAccepted: false,
				isReturned: false,
				expirationDate: '' as unknown as Date,
				BookId: 0,
				UserId: 0,
			},
		];
	}

	/**
	 * @summary Get loan by ID
	 * @param id The loan identifier
	 */
	@Get('{id}')
	@Security('jwt-auth')
	public async getById(@Path() id: number): Promise<Loan> {
		return {
			isAccepted: false,
			isReturned: false,
			expirationDate: '' as unknown as Date,
			BookId: 0,
			UserId: 0,
		};
	}

	/**
	 * @summary Create new loan
	 */
	@Post()
	@Security('jwt-auth')
	public async create(
		@Body()
		requestBody: ReqBodyLoan
	): Promise<Loan> {
		return {
			isAccepted: false,
			isReturned: false,
			expirationDate: '' as unknown as Date,
			BookId: 0,
			UserId: 0,
		};
	}

	/**
	 * @summary Accept loan by Id
	 * @param id The loan identifier
	 */
	@Put('{id}')
	@Security('jwt-auth')
	public async update(
		@Path() id: number,
		@Body() requestBody: ReqBodyLoan
	): Promise<Loan> {
		return {
			isAccepted: true,
			isReturned: false,
			expirationDate: '' as unknown as Date,
			BookId: 0,
			UserId: 0,
		};
	}

	
}
