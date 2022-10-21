import nodemailer from 'nodemailer';

export function sendEmail(email: string, title: string, days: number) {
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'bookurie0@gmail.com',
			pass: 'cbljdxoveqqintwx',
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
