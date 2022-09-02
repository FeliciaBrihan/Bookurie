import { errorMessage } from '../../../helpers/index.js';
import { sequelize } from '../../../global.js';
// import { __filename } from '../../../helpers/createFilename.js';

export async function getById(req, res) {
	const { Product } = sequelize.models;

	try {
		const id = req.params.id;
		const product = await Product.findById(id);
		if (!product) return res.status(400).send({ error: 'invalid id' });

		return res.json(product);
	} catch (error) {
		const message = errorMessage(error);
		// logRequestError(__filename, req, message);
		return res.status(400).send(message);
	}
}
