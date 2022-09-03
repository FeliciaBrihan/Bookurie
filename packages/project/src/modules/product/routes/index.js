export const routeName = 'product';

import { Router } from 'express';
import { getAll } from './getAll.js';
import { getById } from './getById.js';
import { createProduct } from './createProduct.js';
import { updateProduct } from './updateProduct.js';

const router = Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', createProduct);
router.put('/:id', updateProduct);

export const routes = router;
