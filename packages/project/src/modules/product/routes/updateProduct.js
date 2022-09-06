import { sequelize } from '../../../global.js';
import { errorMessage } from '../../../helpers/index.js';

export async function updateProduct(req, res) {
	try {
		const { Product } = sequelize.models;
		const id = req.params.id;

		const product = await Product.findByPk(id);

		if (!product) return res.status(404).send('No product found with this id');

		await Product.update(
			{ name: req.body.name, price: req.body.price },
			{ where: { id: id } }
		);

		const productUpdated = await Product.findByPk(id);

		return res.status(200).json({
			status: 'success',
			data: productUpdated,
		});
	} catch (err) {
		const message = errorMessage(err);
		return res.status(400).send({
			status: 'fail',
			message,
		});
	}
}
