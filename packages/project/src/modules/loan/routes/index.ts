export const routeName = 'loan';

import { Router } from 'express';
import { getAll } from 'src/modules/loan/routes/getAll';
import { create } from 'src/modules/loan/routes/create';
import { acceptLoan } from 'src/modules/loan/routes/acceptLoan';
import { getLoansByUser } from 'src/modules/loan/routes/getLoansByUser';
import { returnLoan } from 'src/modules/loan/routes/returnLoan';
// import { verifyToken } from 'src/modules/auth/routes/verifyToken';
import { deleteLoan } from 'src/modules/loan/routes/delete';
// import { checkAuthorization } from 'src/modules/auth/routes/checkAuthorization';

const router = Router({ mergeParams: true });

router.post('/', create);
router.get('/', getAll);
router.put('/:id', acceptLoan);
router.delete('/:id', deleteLoan);
router.get('/loans', getLoansByUser);
router.put('/loans/:id', returnLoan);

export const routes = router;
