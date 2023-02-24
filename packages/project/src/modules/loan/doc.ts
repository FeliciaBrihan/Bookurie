/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Path, Route, Tags, Post, Put, Security } from 'tsoa';
import { Loan } from 'src/interface';

@Route('')
@Tags('Loan')
@Security('jwt-auth')
export class LoanController extends Controller {
	/**
	 * @summary Get all Loans
	 */
	@Get('loan')
	public async getAll(): Promise<Loan[]> {
		return;
	}

	/**
	 * @summary Get loans by user
	 */
	@Get('loan/loans')
	@Security('jwt-auth')
	public async getByUserId(): Promise<Loan> {
		return;
	}

	/**
	 * @summary Create new loan
	 * @param id The book identifier
	 */
	@Post('books/{id}/loan')
	@Security('jwt-auth')
	public async create(@Path() id: number): Promise<Loan> {
		return;
	}

	/**
	 * @summary Accept loan by Id
	 * @param id The loan identifier
	 */
	@Put('loan/{id}')
	@Security('jwt-auth')
	public async update(@Path() id: number): Promise<Loan> {
		return;
	}

	/**
	 * @summary Return loan by Id
	 * @param id The loan identifier
	 */
	@Put('loan/loans/{id}')
	@Security('jwt-auth')
	public async returnLoan(@Path() id: number): Promise<Loan> {
		return;
	}
}
