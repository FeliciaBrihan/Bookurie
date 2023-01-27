export const routeName = 'book';

import { Router } from 'express';
import { create } from 'src/modules/book/routes/create';
import { getAll } from 'src/modules/book/routes/getAll';
import { getById } from 'src/modules/book/routes/getById';
import { update } from 'src/modules/book/routes/update';
import { deleteBook } from 'src/modules/book/routes/delete';
import { search } from 'src/modules/book/routes/search';
import { routes as loanRouter } from 'src/modules/loan/routes/';
import { routes as purchaseRouter } from 'src/modules/purchase/routes/';
// import { authorization } from 'src/middleware/authorization';
// import { verifyToken } from 'src/modules/auth/routes/verifyToken';
// import { checkAuthorization } from 'src/modules/auth/routes/checkAuthorization';
// import { googleAuth } from 'src/modules/auth';

const router = Router();
router.use('/:bookId/loan', loanRouter);
router.use('/purchase', purchaseRouter);

router.post('/', create);
router.get('/', getAll);
router.get('/:id', getById);
router.put(
	'/:id',

	update
);
router.delete('/:id', deleteBook);
router.get('/search/:query', search);

export const routes = router;
