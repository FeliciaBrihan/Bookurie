export const routeName = 'books';
import { Router } from 'express';
import { create } from './create';
import { getAll } from './getAll';
import { getById } from './getById';
import { update } from './update';
import { deleteBook } from './delete';
import { routes as loanRouter } from '../../loan/routes/index';
import { routes as purchaseRouter } from '../../purchase/routes/index';
import { verifyToken } from '../../auth/routes/verifyToken';
import { checkAuthorization } from '../../auth/routes/checkAuthorization';

const router = Router();
router.use('/:bookId/loan', verifyToken, loanRouter);
router.use('/:bookId/purchase', verifyToken, purchaseRouter);

router.post('/', verifyToken, checkAuthorization('Book: create'), create);
router.get('/', getAll);
router.get(
	'/:id',
	<any>verifyToken,
	<any>checkAuthorization('Book: read'),
	getById
);
router.patch(
	'/:id',
	<any>verifyToken,
	<any>checkAuthorization('Book: update'),
	update
);
router.delete(
	'/:id',
	<any>verifyToken,
	<any>checkAuthorization('Book: delete'),
	deleteBook
);

export const routes = router;
