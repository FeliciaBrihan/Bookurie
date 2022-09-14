export const routeName = 'loan';
import { Router } from 'express';
import { restrictTo } from '../../auth/routes/restrictTo.js';
import { verifyToken } from '../../auth/routes/verifyToken.js';
import { getAll } from '../../loan/routes/getAll.js';
import { create } from './create.js';

const router = Router({ mergeParams: true });

router.post('/', verifyToken, create);
router.get('/', verifyToken, restrictTo('admin'), getAll);

export const routes = router;
