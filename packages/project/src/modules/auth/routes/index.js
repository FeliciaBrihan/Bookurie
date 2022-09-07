export const routeName = 'auth';

import { Router } from 'express';
import { userLogin } from './userLogin.js';
import { userSignUp } from './userSignUp.js';

const router = Router();
router.post('/', userLogin);
router.post('/signUp', userSignUp);

export const routes = router;
