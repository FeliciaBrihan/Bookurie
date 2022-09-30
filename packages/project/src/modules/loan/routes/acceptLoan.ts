import { Request, Response } from 'express';
import { sequelize } from '../../../global';
import { errorMessage } from '../../../helpers/errorMessage';
import nodemailer from 'nodemailer';
import { Loan, ModelLoan, Models } from '../../../interface';

type ReqBody = Loan;
interface ReqParam {
	id: number;
}

export async function acceptLoan(
	req: Request<ReqParam, {}, ReqBody, {}>,
	res: Response<ModelLoan | object>
) {
	const { Loan, User, Book } = sequelize.models as unknown as Models;
	try {
		const { id } = req.params;
		const loan = await Loan.findByPk(id);

		if (!loan) return res.status(400).send({ error: 'Invalid id' });

		await loan.update({ isAccepted: true });

		const book = await Book.findByPk(loan.BookId);

		const daysFor100Pages = 7;
		const loanDurationDays = Math.round((book.pages * daysFor100Pages) / 100);

		const date = new Date();
		const expirationDate = date.setDate(
			date.getDate() + loanDurationDays
		) as unknown as Date;
		await loan.update({ expirationDate: expirationDate });

		// Send email to the user
		const user = await User.findByPk(loan.UserId);

		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: 'bookurie0@gmail.com',
				pass: 'cbljdxoveqqintwx',
			},
		});

		const mailOptions = {
			from: 'bookurie',
			to: user.email,
			subject: 'Your book loan was accepted',
			text: `You will receive the book "${book.title}" shortly. Enjoy! \n Please return the book in ${loanDurationDays} days.`,
		};

		transporter.sendMail(mailOptions, function (error, info) {
			if (error) {
				console.log(error);
			} else {
				console.log(`Email sent to ${user.email}`);
			}
		});

		return res.status(200).json({
			status: 'success',
			message: 'Loan accepted',
			data: loan,
		});
	} catch (error) {
		const message = errorMessage(error);
		res.status(400).send(message);
	}
}
