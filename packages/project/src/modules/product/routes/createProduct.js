import { getDatabaseModels } from '../../../helpers/index.js';

export async function createProduct(req, res) {
	const { Product } = await getDatabaseModels();

	const newProduct = await Product.create(req.body);

	res.status(201).json({ status: 'success', data: newProduct });
}
