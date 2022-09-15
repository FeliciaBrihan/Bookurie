export const routeName = 'loan';
import { Router } from 'express';
import { restrictTo } from '../../auth/routes/restrictTo.js';
import { verifyToken } from '../../auth/routes/verifyToken.js';
import { getAll } from '../../loan/routes/getAll.js';
import { create } from './create.js';
import { acceptLoan } from './acceptLoan.js';
import { getLoansByUser } from './getLoansByUser.js';
import { returnLoan } from './returnLoan.js';

const router = Router({ mergeParams: true });

router.post('/', verifyToken, create);
router.get('/', verifyToken, restrictTo('admin'), getAll);
router.put('/:id', verifyToken, restrictTo('admin'), acceptLoan);
router.get('/myLoans', verifyToken, restrictTo('user'), getLoansByUser);
router.put('/myLoans/:id', verifyToken, returnLoan);

export const routes = router;
