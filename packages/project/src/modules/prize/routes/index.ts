export const routeName = 'prize';

import { Router } from 'express';
import { update } from './update';
import { checkAuthorization } from '../../auth/routes/checkAuthorization';
import { verifyToken } from '../../auth/routes/verifyToken';


const router = Router();

router.put('/', verifyToken, checkAuthorization('Prize: update'), update);

export const routes = router;
