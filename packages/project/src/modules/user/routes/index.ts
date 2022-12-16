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
import { isAllowed } from 'src/modules/user/routes/isAllowed';
// import { restrictTo } from 'src/modules/auth/routes/restrictTo';
// import { checkAuthorization } from 'src/modules/auth/routes/checkAuthorization';
// import { googleAuth } from 'src/modules/auth';

const router = Router();

router.get('/', getAllUsers);
router.get('/allowed', isAllowed);
router.get('/history', <any>verifyToken, viewHistory);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put(
	'/:id',

	updateUser
);
router.delete('/:id', deleteUser);
router.put('/:userId/changeRole', changeUserRole);
router.post('/signUp', userSignUp);

export const routes = router;
