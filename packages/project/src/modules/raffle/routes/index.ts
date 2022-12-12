export const routeName = 'raffle';

import { Router } from 'express';
// import { restrictTo } from 'src/modules/auth/routes/restrictTo';
// import { verifyToken } from 'src/modules/auth/routes/verifyToken';
import { getAll } from 'src/modules/raffle/routes/getAll';
import { deleteRaffle } from 'src/modules/raffle/routes/delete';

const router = Router();

router.get('', getAll);
router.delete('/:id', deleteRaffle);

export const routes = router;
