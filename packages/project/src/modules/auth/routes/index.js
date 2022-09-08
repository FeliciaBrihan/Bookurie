export const routeName = 'auth';

import { Router } from 'express';
import { userLogin } from './userLogin.js';
import { userLogout } from './userLogout.js';
import { userSignUp } from './userSignUp.js';

const router = Router();
router.post('/login', userLogin);
router.post('/signUp', userSignUp);
router.get('/logout', userLogout);

export const routes = router;
export { verifyToken } from '../routes/verifyToken.js';
