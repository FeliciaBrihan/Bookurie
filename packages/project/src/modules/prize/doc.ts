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
import { Prize } from 'src/interface';

type ReqBodyPrize = Pick<Prize, 'bookId' | 'voucher'>;

@Route('prize')
@Tags('Prize')
export class PrizeController extends Controller {
	/**
	 * @summary Update prize
	 */
	@Put()
	@Security('jwt-auth')
	public async update(@Body() requestBody: ReqBodyPrize): Promise<Prize> {
		return;
	}
}
