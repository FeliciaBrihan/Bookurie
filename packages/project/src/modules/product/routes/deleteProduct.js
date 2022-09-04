import { getDatabaseModels } from '../../../helpers/index.js';

export async function deleteProduct(req, res) {
	try {
		const { Product } = await getDatabaseModels();
		const { id } = req.params;
		const productToDelete = await Product.findByPk(id);
		if (!productToDelete)
			return res.status(404).send('No product found with this id');
		Product.destroy({ where: { id: id } });
		res.status(200).json({
			status: 'success',
			data: null,
		});
	} catch (err) {
		console.log(err);
	}
}
