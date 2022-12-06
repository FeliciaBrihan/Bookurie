export const routeName = 'auth';

import { Router } from 'express';
import { userLogin } from 'src/modules/auth/routes/userLogin';

const router = Router();
router.post('/login', userLogin);

export const routes = router;
export { verifyToken } from 'src/modules/auth/routes/verifyToken';
export { googleAuth } from 'src/modules/auth/routes/googleAuth';
