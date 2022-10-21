export const routeName = 'books';

import { Router } from 'express';
import { create } from 'src/modules/book/routes/create';
import { getAll } from 'src/modules/book/routes/getAll';
import { getById } from 'src/modules/book/routes/getById';
import { update } from 'src/modules/book/routes/update';
import { deleteBook } from 'src/modules/book/routes/delete';
import { search } from 'src/modules/book/routes/search';
import { routes as loanRouter } from 'src/modules/loan/routes/';
import { routes as purchaseRouter } from 'src/modules/purchase/routes/';
import { verifyToken } from 'src/modules/auth/routes/verifyToken';
import { checkAuthorization } from 'src/modules/auth/routes/checkAuthorization';

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
router.put(
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
router.get('/search/:query', search);

export const routes = router;
