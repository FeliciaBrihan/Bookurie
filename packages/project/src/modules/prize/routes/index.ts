export const routeName = 'prize';

import { Router } from 'express';
import { update } from 'src/modules/prize/routes/update';
import { checkAuthorization } from 'src/modules/auth/routes/checkAuthorization';
import { verifyToken } from 'src/modules/auth/routes/verifyToken';

const router = Router();

router.put('/', verifyToken, checkAuthorization('Prize: update'), update);

export const routes = router;
