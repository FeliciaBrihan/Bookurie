export const routeName = 'purchase';

import { Router } from 'express';
import { getAll } from 'src/modules/purchase/routes/getAll';
import { create } from 'src/modules/purchase/routes/create';
import { getByUser } from 'src/modules/purchase/routes/getByUser';
import { deletePurchase } from 'src/modules/purchase/routes/delete';
// import { verifyToken } from 'src/modules/auth/routes/verifyToken';
// import { checkAuthorization } from 'src/modules/auth/routes/checkAuthorization';

const router = Router({ mergeParams: true });

router.post('/', create);
router.get('/all', getAll);
router.get('/', getByUser);
router.delete('/:id', deletePurchase);

export const routes = router;
