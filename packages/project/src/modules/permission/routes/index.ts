export const routeName = 'permission';

import { Router } from 'express';
import { create } from 'src/modules/permission/routes/create';
import { getAll } from 'src/modules/permission/routes/getAll';
import { deletePermission } from 'src/modules/permission/routes/delete';
import { update } from 'src/modules/permission/routes/update';
// import { verifyToken } from 'src/modules/auth/routes/verifyToken';
// import { restrictTo } from 'src/modules/auth/routes/restrictTo';
// import { checkAuthorization } from 'src/modules/auth/routes/checkAuthorization';

const router = Router();
router.post('/', create);
router.get('/', getAll);
router.delete('/:id', deletePermission);
router.put('/:id', update);

export const routes = router;
