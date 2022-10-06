export const routeName = 'prize';

import { Router } from 'express';
import { checkAuthorization } from '../../auth/routes/checkAuthorization';
import { verifyToken } from '../../auth/routes/verifyToken';
import { update } from './update';

const router = Router();

router.put('/', verifyToken, checkAuthorization('Prize: update'), update);

export const routes = router;
