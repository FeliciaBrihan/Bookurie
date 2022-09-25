import { Model } from 'sequelize';
import { DefaultParanoidAttributes } from './DefaultParanoidAttributes';

export interface Loan extends DefaultParanoidAttributes {
	isAccepted: boolean;
	isReturned: boolean;
	expirationDate: Date;
	BookId: number;
	UserId: number;
}

export interface LoanAttributes extends Loan {
	dataValues?: Loan;
}

export type ModelLoan = Model<LoanAttributes, LoanAttributes> & LoanAttributes;
