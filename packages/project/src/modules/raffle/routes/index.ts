export const routeName = 'raffle'

import { Router } from 'express';
import { restrictTo } from '../../auth/routes/restrictTo';
import { verifyToken } from '../../auth/routes/verifyToken';
import { getAll } from './getAll';

const router = Router();

router.get('', verifyToken, restrictTo('admin'), getAll)

export const routes = router;
