export const routeName = 'auth';

import { Router } from 'express';
import { verifyToken } from './verifyToken';
import { restrictTo } from './restrictTo';
import { userLogin } from './userLogin';
import { userSignUp } from './userSignUp';

const router = Router();
router.post('/login', userLogin);
router.post('/signUp', userSignUp);

export const routes = router;
export { verifyToken } from './verifyToken';
