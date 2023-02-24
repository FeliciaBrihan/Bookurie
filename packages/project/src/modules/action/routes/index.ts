export const routeName = 'action';

import { Router } from 'express';
import { create } from 'src/modules/action/routes/create';
import { getAll } from 'src/modules/action/routes/getAll';
import { deleteAction } from 'src/modules/action/routes/delete';
import { update } from 'src/modules/action/routes/update';
// import { verifyToken } from 'src/modules/auth/routes/verifyToken';
// import { checkAuthorization } from 'src/modules/auth/routes/checkAuthorization';
// import { restrictTo } from 'src/modules/auth/routes/restrictTo';

const router = Router();
router.post('/', create);
router.get('/', getAll);
router.delete(
	'/:id',

	deleteAction
);
router.put(
	'/:id',

	update
);

export const routes = router;
