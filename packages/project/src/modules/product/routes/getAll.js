import { sequelize } from '../../../global.js';
import { errorMessage } from '../../../helpers/index.js';

export async function getAll(req, res) {
	const { Product } = sequelize.models;
	try {
		const products = await Product.findAll();

		return res.status(200).json({
			status: 'success',
			results: products.length,
			data: products,
		});
	} catch (err) {
		const message = errorMessage(err);
		return res.status(400).send(message);
	}
}
