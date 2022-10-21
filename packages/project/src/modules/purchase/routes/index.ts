export const routeName = 'purchase';

import { Router } from 'express';
import { getAll } from 'src/modules/purchase/routes/getAll';
import { create } from 'src/modules/purchase/routes/create';
import { getByUser } from 'src/modules/purchase/routes/getByUser';
import { verifyToken } from 'src/modules/auth/routes/verifyToken';
import { checkAuthorization } from 'src/modules/auth/routes/checkAuthorization';

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
