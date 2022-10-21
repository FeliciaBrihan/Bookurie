export const routeName = 'user';

import { Router } from 'express';
import { createUser } from 'src/modules/user/routes/createUser';
import { deleteUser } from 'src/modules/user/routes/deleteUser';
import { updateUser } from 'src/modules/user/routes/updateUser';
import { getAllUsers } from 'src/modules/user/routes/getAllUsers';
import { getUserById } from 'src/modules/user/routes/getUserById';
import { changeUserRole } from 'src/modules/user/routes/changeUserRole';
import { viewHistory } from 'src/modules/user/routes/history';
import { userSignUp } from 'src/modules/user/routes/userSignUp';
import { verifyToken } from 'src/modules/auth/routes/verifyToken';
import { restrictTo } from 'src/modules/auth/routes/restrictTo';
import { checkAuthorization } from 'src/modules/auth/routes/checkAuthorization';

const router = Router();

router.get('/', verifyToken, checkAuthorization('User: read'), getAllUsers);
router.get('/history', <any>verifyToken, viewHistory);
router.get(
	'/:id',
	<any>verifyToken,
	<any>checkAuthorization('User: read'),
	getUserById
);
router.post('/', verifyToken, checkAuthorization('User: create'), createUser);
router.put(
	'/:id',
	<any>verifyToken,
	<any>checkAuthorization('User: update'),
	updateUser
);
router.delete(
	'/:id',
	<any>verifyToken,
	<any>checkAuthorization('User: delete'),
	deleteUser
);
router.put(
	'/:userId/changeRole',
	<any>verifyToken,
	<any>restrictTo('admin'),
	changeUserRole
);
router.post('/signUp', userSignUp);

export const routes = router;
