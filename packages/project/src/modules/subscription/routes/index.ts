export const routeName = 'subscription';

import { Router } from 'express';
import { create } from './create';
import { deleteSubscription } from './delete';
import { getAll } from './getAll';
import { getById } from './getById';
import { update } from './update';
import { subscribe } from './subscribe';
import { verifyToken } from '../../auth/routes/verifyToken';
import { checkAuthorization } from '../../auth/routes/checkAuthorization';

const router = Router();

router.post(
	`/`,
	verifyToken,
	checkAuthorization('Subscription: create'),
	create
);
router.get('/', verifyToken, checkAuthorization('Subscription: read'), getAll);
router.get(
	'/:id',
	<any>verifyToken,
	<any>checkAuthorization('Subscription: read'),
	getById
);
router.put(
	'/:id',
	<any>verifyToken,
	<any>checkAuthorization('Subscription: update'),
	update
);
router.delete(
	'/:id',
	<any>verifyToken,
	<any>checkAuthorization('Subscription: delete'),
	deleteSubscription
);
router.put('/:id/subscribe', verifyToken, subscribe);

export const routes = router;
