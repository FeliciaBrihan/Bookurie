import { sequelize } from '../../../global.js';
import { errorMessage } from '../../../helpers/index.js';

export async function createProduct(req, res) {
	try {
		const { Product } = sequelize.models;
		const newProduct = await Product.create(req.body);

		res.status(201).json({ status: 'success', data: newProduct });
	} catch (err) {
		const message = errorMessage(err);
		res.status(400).send(message);
	}
}
