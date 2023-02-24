export const routeName = 'prize';

import { Router } from 'express';
import { update } from 'src/modules/prize/routes/update';
// import { checkAuthorization } from 'src/modules/auth/routes/checkAuthorization';
// import { verifyToken } from 'src/modules/auth/routes/verifyToken';
import { getAll } from 'src/modules/prize/routes/getAll';

const router = Router();

router.put('/', update);
router.get('/', getAll);

export const routes = router;
