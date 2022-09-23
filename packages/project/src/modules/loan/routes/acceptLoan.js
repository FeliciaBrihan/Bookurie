import { sequelize } from '../../../global.js';
import { errorMessage } from '../../../helpers/errorMessage.js';
import nodemailer from 'nodemailer';

export async function acceptLoan(req, res) {
	const { Loan, User, Book } = sequelize.models;
	try {
		const { id } = req.params;
		const loan = await Loan.findByPk(id);

		if (!loan) return res.status(400).send('Invalid id');

		await loan.update({ isAccepted: true });

		const date = new Date();
		const expirationDate = date.setDate(date.getDate() + 30);
		await loan.update({ expirationDate: expirationDate });

		// Send email to the user
		const user = await User.findByPk(loan.UserId);
		const book = await Book.findByPk(loan.BookId);

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
			text: `You will receive the book "${book.title}" shortly. Enjoy! \n Please return the book in 30 days.`,
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
