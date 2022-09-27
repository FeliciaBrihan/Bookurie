export const routeName = 'subscription';

import { Router } from 'express';
import { create } from './create';
import { deleteSubscription } from './delete';
import { getAll } from './getAll';
import { getById } from './getById';
import { update } from './update';
import { subscribe } from './subscribe';
import { verifyToken } from '../../auth/routes/verifyToken';

const router = Router();

router.post(`/`, create);
router.get('/', getAll);
router.get('/:id', getById);
router.patch('/:id', update);
router.delete('/:id', deleteSubscription);
router.put('/:id/subscribe', verifyToken, subscribe);

export const routes = router;
