export const routeName = 'loan';
import { Router } from 'express';
import { verifyToken } from '../../auth/routes/verifyToken.js';
import { getAll } from '../../loan/routes/getAll.js';
import { create } from './create.js';
import { acceptLoan } from './acceptLoan.js';
import { getLoansByUser } from './getLoansByUser.js';
import { returnLoan } from './returnLoan.js';
import { checkAuthorization } from '../../auth/routes/checkAuthorization.js';

const router = Router({ mergeParams: true });

router.post('/', verifyToken, checkAuthorization('Loan: create'), create);
router.get('/', verifyToken, checkAuthorization('Loan: read'), getAll);
router.put('/:id', verifyToken, checkAuthorization('Loan: accept'), acceptLoan);
router.get(
	'/myLoans',
	verifyToken,
	checkAuthorization('Loan: read'),
	getLoansByUser
);
router.put(
	'/myLoans/:id',
	verifyToken,
	checkAuthorization('Loan: return'),
	returnLoan
);

export const routes = router;
