import { errorMessage } from '../../../helpers/index.js';
import { sequelize } from '../../../global.js';

export async function getById(req, res) {
	const { Product } = sequelize.models;

	try {
		const id = req.params.id;
		const product = await Product.findByPk(id);
		if (!product) return res.status(400).send({ error: 'invalid id' });

		return res.json(product);
	} catch (err) {
		const message = errorMessage(err);
		return res.status(400).send(message);
	}
}
