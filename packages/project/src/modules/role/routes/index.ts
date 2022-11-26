export const routeName = 'role';

import { Router } from 'express';
import { create } from 'src/modules/role/routes/create';
import { getAll } from 'src/modules/role/routes/getAll';
import { deleteRole } from 'src/modules/role/routes/delete';
import { update } from 'src/modules/role/routes/update';
// import { verifyToken } from 'src/modules/auth/routes/verifyToken';
// import { checkAuthorization } from 'src/modules/auth/routes/checkAuthorization';

const router = Router();
router.post('/', create);
router.get('/', getAll);
router.delete('/:id', deleteRole);
router.put('/:id', update);

export const routes = router;
