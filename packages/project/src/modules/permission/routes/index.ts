export const routeName = 'permission';

import { Router } from 'express';
import { verifyToken } from '../../auth/routes/verifyToken';
import { restrictTo } from '../../auth/routes/restrictTo';
import { create } from './create';
import { getAll } from './getAll';
import { deletePermission } from './delete';
import { update } from './update';
import { checkAuthorization } from '../../auth/routes/checkAuthorization';

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
