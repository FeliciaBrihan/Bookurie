export const routeName = 'loan';

import { Router } from 'express';
import { getAll } from './getAll';
import { create } from './create';
import { acceptLoan } from './acceptLoan';
import { getLoansByUser } from './getLoansByUser';
import { returnLoan } from './returnLoan';
import { verifyToken } from '../../auth/routes/verifyToken';
import { checkAuthorization } from '../../auth/routes/checkAuthorization';

const router = Router({ mergeParams: true });

router.post('/', <any>verifyToken, create);
router.get('/', verifyToken, checkAuthorization('Loan: read'), getAll);
router.put(
	'/:id',
	<any>verifyToken,
	<any>checkAuthorization('Loan: accept'),
	acceptLoan
);
router.get('/loans', <any>verifyToken, getLoansByUser);
router.put('/loans/:id', <any>verifyToken, returnLoan);

export const routes = router;
