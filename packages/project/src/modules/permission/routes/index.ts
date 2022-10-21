export const routeName = 'permission';

import { Router } from 'express';
import { create } from 'src/modules/permission/routes/create';
import { getAll } from 'src/modules/permission/routes/getAll';
import { deletePermission } from 'src/modules/permission/routes/delete';
import { update } from 'src/modules/permission/routes/update';
import { verifyToken } from 'src/modules/auth/routes/verifyToken';
import { restrictTo } from 'src/modules/auth/routes/restrictTo';
import { checkAuthorization } from 'src/modules/auth/routes/checkAuthorization';

const router = Router();
router.post('/', verifyToken, restrictTo('admin'), create);
router.get('/', verifyToken, checkAuthorization('Permission: read'), getAll);
router.delete(
	'/:id',
	<any>verifyToken,
	<any>checkAuthorization('Permission: read'),
	deletePermission
);
router.put(
	'/:id',
	<any>verifyToken,
	<any>checkAuthorization('Permission: update'),
	update
);

export const routes = router;
