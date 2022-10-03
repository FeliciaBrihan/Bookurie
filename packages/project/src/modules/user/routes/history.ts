import { Request, Response } from 'express';
import { sequelize } from '../../../global';
import { errorMessage } from '../../../helpers/index';
import {
	Models,
	ExtraRequest,
	ModelLoan,
	ModelPurchase,
} from '../../../interface';

export async function viewHistory(
	req: Request & ExtraRequest,
	res: Response<ModelLoan | ModelPurchase | object>
) {
	const { Loan, Purchase, Raffle } = sequelize.models as unknown as Models;

	try {
		const userId = req.currentUserId;
		const loans = await Loan.findAll({ where: { UserId: userId } });
		const purchases = await Purchase.findAll({ where: { UserId: userId } });
		const raffleWins = await Raffle.findAll({ where: { UserId: userId } });

		res.status(200).json({
			data: {
				loans: loans.length > 0 ? loans : 'No loans',
				purchases: purchases.length > 0 ? purchases : 'No purchases',
				raffleWins: raffleWins.length > 0 ? raffleWins : 'No prizes won!',
			},
		});
	} catch (error) {
		const message = errorMessage(error);
		res.status(400).send({ error: message });
	}
}
