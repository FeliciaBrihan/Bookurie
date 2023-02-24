export const routeName = 'subscription';

import { Router } from 'express';
import { create } from 'src/modules/subscription/routes/create';
import { deleteSubscription } from 'src/modules/subscription/routes/delete';
import { getAll } from 'src/modules/subscription/routes/getAll';
import { getById } from 'src/modules/subscription/routes/getById';
import { update } from 'src/modules/subscription/routes/update';
import { subscribe } from 'src/modules/subscription/routes/subscribe';
import { verifyToken } from 'src/modules/auth/routes/verifyToken';
import { checkAuthorization } from 'src/modules/auth/routes/checkAuthorization';
import { cancelSubscription } from 'src/modules/subscription/routes/cancel';

const router = Router();

router.post(
	`/`,
	// verifyToken,
	// checkAuthorization('Subscription: create'),
	create
);
router.get('/', getAll);
router.get(
	'/:id',
	<any>verifyToken,
	<any>checkAuthorization('Subscription: read'),
	getById
);
router.put(
	'/:id',
	// <any>verifyToken,
	// <any>checkAuthorization('Subscription: update'),
	update
);
router.delete(
	'/:id',
	// <any>verifyToken,
	// <any>checkAuthorization('Subscription: delete'),
	deleteSubscription
);
router.put('/:id/subscribe', subscribe);
router.put('/:id/unsubscribe', cancelSubscription);

export const routes = router;
