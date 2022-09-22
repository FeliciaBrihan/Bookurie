export const routeName = 'auth';

import { Router } from 'express';
import { verifyToken } from '../routes/verifyToken.js';
import { restrictTo } from './restrictTo.js';
import { setPermissions } from './setPermissions.js';
import { userLogin } from './userLogin.js';
import { userLogout } from './userLogout.js';
import { userSignUp } from './userSignUp.js';

const router = Router();
router.post('/login', userLogin);
router.post('/signUp', userSignUp);
router.get('/logout', userLogout);
router.post('/permissions', verifyToken, restrictTo('admin'), setPermissions);

export const routes = router;
export { verifyToken } from '../routes/verifyToken.js';
