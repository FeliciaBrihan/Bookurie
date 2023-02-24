import { Request, Response } from 'express';
import { sequelize } from 'src/global';
import { errorMessage } from 'src/helpers';
import {
	Models,
	ExtraRequest,
	ModelLoan,
	ModelPurchase,
	ModelRaffle,
} from 'src/interface';

export async function viewHistory(
	req: Request & ExtraRequest,
	res: Response<ModelLoan | ModelPurchase | ModelRaffle | object>
) {
	const { Loan, Purchase, Raffle } = sequelize.models as unknown as Models;

	try {
		const { currentUserId: userId } = req;

		const loans = await Loan.findAll({ where: { UserId: userId } });
		const purchases = await Purchase.findAll({ where: { UserId: userId } });
		const raffleWins = await Raffle.findAll({ where: { UserId: userId } });

		return res.status(200).json({
			data: {
				loans,
				purchases,
				raffleWins,
			},
		});
	} catch (error) {
		const message = errorMessage(error);
		res.status(400).send({ error: message });
	}
}
