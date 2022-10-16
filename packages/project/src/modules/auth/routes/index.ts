export const routeName = 'auth';

import { Router } from 'express';
import { userLogin } from './userLogin';

const router = Router();
router.post('/login', userLogin);

export const routes = router;
export { verifyToken } from './verifyToken';
