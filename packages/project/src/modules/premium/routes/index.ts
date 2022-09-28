export const routeName = 'premium';

import { Router } from 'express';

import { getById } from './getById';
import { update } from './update';
import { subscribe } from './subscribe';
import { verifyToken } from '../../auth/routes/verifyToken';

const router = Router();

router.get('/', getById);
router.patch('/', update);
router.put('/subscribe', verifyToken, subscribe);

export const routes = router;
