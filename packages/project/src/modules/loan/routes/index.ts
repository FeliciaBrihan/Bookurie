export const routeName = 'loan';

import { Router } from 'express';
import { getAll } from 'src/modules/loan/routes/getAll';
import { create } from 'src/modules/loan/routes/create';
import { acceptLoan } from 'src/modules/loan/routes/acceptLoan';
import { getLoansByUser } from 'src/modules/loan/routes/getLoansByUser';
import { returnLoan } from 'src/modules/loan/routes/returnLoan';
import { verifyToken } from 'src/modules/auth/routes/verifyToken';
import { checkAuthorization } from 'src/modules/auth/routes/checkAuthorization';

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
