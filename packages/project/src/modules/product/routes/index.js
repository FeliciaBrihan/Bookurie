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
router.get('/:id', verifyToken, getById);
router.post('/', verifyToken, createProduct);
router.put('/:id', verifyToken, updateProduct);
router.delete('/:id', verifyToken, deleteProduct);

export const routes = router;
