export const routeName = 'purchase';

import { Router } from 'express';
import { getAll } from './getAll';
import { verifyToken } from '../../auth/routes/verifyToken';
import { create } from './create';
import { getByUser } from './getByUser';

const router = Router({ mergeParams: true });

router.post('/', <any>verifyToken, create);
router.get('/all', getAll);
router.get('/', verifyToken, getByUser);

export const routes = router;
