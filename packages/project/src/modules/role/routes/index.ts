export const routeName = 'role';

import { Router } from 'express';
import { create } from './create';
import { getAll } from './getAll';
import { deleteRole } from './delete';
import { update } from './update';
import { verifyToken } from '../../auth/routes/verifyToken';
import { checkAuthorization } from '../../auth/routes/checkAuthorization';

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
