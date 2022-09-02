export const routeName = 'product';

import { Router } from 'express';
import { getById } from './getById.js';

const router = Router();

// router.get('/:id', getById);
router.get('product/:id', getById);

export const routes = router;
