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

const router = Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.patch(
	'/:userId/changeRole',
	verifyToken,
	restrictTo('admin'),
	changeUserRole
);

export const routes = router;
