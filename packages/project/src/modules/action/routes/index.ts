export const routeName = 'action';

import { Router } from 'express';
import { verifyToken } from '../../auth/routes/verifyToken';
import { create } from './create';
import { getAll } from './getAll';
import { deleteAction } from './delete';
import { update } from './update';
import { checkAuthorization } from '../../auth/routes/checkAuthorization';
import { restrictTo } from '../../auth/routes/restrictTo';

const router = Router();
router.post('/', verifyToken, restrictTo('admin'), create);
router.get('/', verifyToken, checkAuthorization('Action: read'), getAll);
router.delete(
	'/:id',
	<any>verifyToken,
	<any>checkAuthorization('Action: read'),
	deleteAction
);
router.put(
	'/:id',
	<any>verifyToken,
	<any>checkAuthorization('Action: update'),
	update
);

export const routes = router;
