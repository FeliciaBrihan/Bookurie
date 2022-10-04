export const routeName = 'purchase';

import { Router } from 'express';
import { getAll } from './getAll';
import { verifyToken } from '../../auth/routes/verifyToken';
import { create } from './create';
import { getByUser } from './getByUser';
import { checkAuthorization } from '../../auth/routes/checkAuthorization';

const router = Router({ mergeParams: true });

router.post('/', <any>verifyToken, create);
router.get(
	'/all',
	<any>verifyToken,
	checkAuthorization('Purchase: read'),
	getAll
);
router.get('/', verifyToken, getByUser);

export const routes = router;
