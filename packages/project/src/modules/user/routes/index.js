export const routeName = 'user';
import { Router } from 'express';
import { createUser } from './createUser.js';
import { deleteUser } from './deleteUser.js';
import { updateUser } from './updateUser.js';
import { getAllUsers } from './getAllUsers.js';
import { getUserById } from './getUserById.js';
import { verifyToken } from '../../auth/routes/verifyToken.js';
import { restrictTo } from '../../auth/routes/restrictTo.js';
import { changeUserRole } from './changeUserRol.js';

const router = Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.patch(
	'/admin/users/:userId',
	verifyToken,
	restrictTo('admin'),
	changeUserRole
);

export const routes = router;
