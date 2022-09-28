export const routeName = 'purchase';

import { Router } from 'express';
import { getAll } from './getAll';
import { verifyToken } from '../../auth/routes/verifyToken';
import { create } from './create';
import { getByUser } from './getByUser';

const router = Router({ mergeParams: true });

router.post('/', verifyToken, create);
router.get('/', getAll);
router.get('/all', verifyToken, getByUser);

export const routes = router;
