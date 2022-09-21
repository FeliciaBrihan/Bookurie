export const routeName = 'books';
import { Router } from 'express';
import { create } from './create.js';
import { getAll } from './getAll.js';
import { getById } from './getById.js';
import { update } from './update.js';
import { deleteBook } from './delete.js';
import { routes as loanRouter } from '../../loan/routes/index.js';
import { restrictTo } from '../../auth/routes/restrictTo.js';
import { verifyToken } from '../../auth/routes/verifyToken.js';
import { checkAuthorization } from '../../auth/routes/checkAuthorization.js';

const router = Router();
router.use('/:bookId/loan', verifyToken, loanRouter);

router.post('/', verifyToken, restrictTo('admin'), create);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', verifyToken, restrictTo('admin'), update);
router.delete(
	'/:id',
	verifyToken,
	checkAuthorization('Book', 'delete'),
	deleteBook
);

export const routes = router;
