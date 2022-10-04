export const routeName = 'action';

import { Router } from 'express';
import { verifyToken } from '../../auth/routes/verifyToken';
import { create } from './create';
import { getAll } from './getAll';
import { deleteAction } from './delete';
import { update } from './update';
import { checkAuthorization } from '../../auth/routes/checkAuthorization';

const router = Router();
router.post('/', verifyToken, checkAuthorization('Action: create'), create);
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
