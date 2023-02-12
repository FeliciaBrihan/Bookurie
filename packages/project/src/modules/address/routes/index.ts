export const routeName = 'address';

import { Router } from 'express';
import { getById } from 'src/modules/address/routes/getById';
import { create } from 'src/modules/address/routes/create';
import { update } from 'src/modules/address/routes/update';
// import { verifyToken } from 'src/modules/auth/routes/verifyToken';

const router = Router();

router.post('/', create);
router.get('/', getById);
router.put('/:id', update);

export const routes = router;
