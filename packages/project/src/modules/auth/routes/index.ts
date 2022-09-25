export const routeName = 'auth';

import { Router } from 'express';
import { verifyToken } from './verifyToken';
import { restrictTo } from './restrictTo';
import { setPermissions } from './setPermissions';
import { userLogin } from './userLogin';
import { userSignUp } from './userSignUp';

const router = Router();
router.post('/login', userLogin);
router.post('/signUp', userSignUp);
router.post('/permissions', verifyToken, restrictTo('admin'), setPermissions);

export const routes = router;
export { verifyToken } from './verifyToken';
