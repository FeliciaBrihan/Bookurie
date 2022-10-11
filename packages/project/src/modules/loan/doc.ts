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

type ReqBodyLoan = Pick<
	Loan,
	'BookId' | 'UserId' | 'expirationDate' | 'isAccepted' | 'isReturned'
>;

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
	 * @summary Get loans by user
	 * @param id The loan identifier
	 */
	@Get('/loans')
	@Security('jwt-auth')
	public async getByUserId(): Promise<Loan> {
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
	public async update(@Path() id: number): Promise<Loan> {
		return {
			isAccepted: true,
			isReturned: false,
			expirationDate: '' as unknown as Date,
			BookId: 0,
			UserId: 0,
		};
	}

	/**
	 * @summary Return loan by Id
	 * @param id The loan identifier
	 */
	@Put('loans/{id}')
	@Security('jwt-auth')
	public async returnLoan(@Path() id: number): Promise<Loan> {
		return {
			isAccepted: true,
			isReturned: false,
			expirationDate: '' as unknown as Date,
			BookId: 0,
			UserId: 0,
		};
	}
}
