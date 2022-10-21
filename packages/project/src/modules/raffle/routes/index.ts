export const routeName = 'raffle';

import { Router } from 'express';
import { restrictTo } from 'src/modules/auth/routes/restrictTo';
import { verifyToken } from 'src/modules/auth/routes/verifyToken';
import { getAll } from 'src/modules/raffle/routes/getAll';

const router = Router();

router.get('', verifyToken, restrictTo('admin'), getAll);

export const routes = router;
