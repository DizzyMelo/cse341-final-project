import express from 'express';
const router = express.Router();
import controller from '../controllers/users';
import { loadUser } from '../middleware/loadUser'

router.post('/', controller.post);
router.get('/', controller.getAll);
router.get('/:id', controller.getOne);
router.get('/email/:id', controller.getUserByEmail);
router.get('/login/:id', controller.getUserByLogin);

router.use(loadUser)

router.put('/:id', controller.put);
router.delete('/:id', controller.deleteOne);

module.exports = router;
