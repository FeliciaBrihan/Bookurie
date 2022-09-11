export const routeName = 'product';

import { Router } from 'express';
import { getAll } from './getAll.js';
import { getById } from './getById.js';
import { createProduct } from './createProduct.js';
import { updateProduct } from './updateProduct.js';
import { deleteProduct } from './deleteProduct.js';
import { verifyToken } from '../../auth/routes/verifyToken.js';

const router = Router();

router.get('/', verifyToken, getAll);
router.get('/:id', getById);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export const routes = router;
