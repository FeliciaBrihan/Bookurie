export const routeName = 'user';
import { Router } from 'express';
import { createUser } from './createUser';
import { deleteUser } from './deleteUser';
import { updateUser } from './updateUser';
import { getAllUsers } from './getAllUsers';
import { getUserById } from './getUserById';
import { verifyToken } from '../../auth/routes/verifyToken';
import { restrictTo } from '../../auth/routes/restrictTo';
import { changeUserRole } from './changeUserRole';
import { viewHistory } from './history';
import { checkAuthorization } from '../../auth/routes/checkAuthorization';
import { userSignUp } from './userSignUp';

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
router.patch(
	'/:userId/changeRole',
	<any>verifyToken,
	<any>restrictTo('admin'),
	changeUserRole
);
router.post('/signUp', userSignUp);

export const routes = router;
