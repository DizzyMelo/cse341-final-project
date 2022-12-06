import express from 'express';
const router = express.Router();
import controller from '../controllers/posts';
import { loadUser } from '../middleware/loadUser'

router.get('/', controller.getAll);
router.get('/:id', controller.getOne);

router.use(loadUser)

router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/:id', controller.deleteOne);

module.exports = router;
