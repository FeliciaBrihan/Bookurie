export const routeName = 'role';

import { Router } from 'express';
import { create } from 'src/modules/role/routes/create';
import { getAll } from 'src/modules/role/routes/getAll';
import { deleteRole } from 'src/modules/role/routes/delete';
import { update } from 'src/modules/role/routes/update';
import { verifyToken } from 'src/modules/auth/routes/verifyToken';
import { checkAuthorization } from 'src/modules/auth/routes/checkAuthorization';

const router = Router();
router.post('/', verifyToken, checkAuthorization('Role: create'), create);
router.get('/', verifyToken, checkAuthorization('Role: read'), getAll);
router.delete(
	'/:id',
	<any>verifyToken,
	<any>checkAuthorization('Role: read'),
	deleteRole
);
router.put(
	'/:id',
	<any>verifyToken,
	<any>checkAuthorization('Role: update'),
	update
);

export const routes = router;
