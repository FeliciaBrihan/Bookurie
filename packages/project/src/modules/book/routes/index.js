export const routeName = 'books';
import { Router } from 'express';
import { create } from './create.js';
import { getAll } from './getAll.js';
import { getById } from './getById.js';
import { update } from './update.js';
import { deleteBook } from './delete.js';

const router = Router();

router.post('/', create);
router.get('/', getAll);
router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', deleteBook);

export const routes = router;
