import nodemailer from 'nodemailer';

export function sendEmail(email: string, title: string, days: number) {
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASSWORD,
		},
	});

	const mailOptions = {
		from: 'bookurie',
		to: email,
		subject: 'Your book loan was accepted',
		text: `You will receive the book "${title}" shortly. Enjoy! \n Please return the book in ${days} days.`,
	};

	transporter.sendMail(mailOptions, function (error) {
		if (error) {
			console.log(error);
		} else {
			console.log(`Email sent to ${email}`);
		}
	});
}
