import express from 'express';
const router = express.Router();
import controller from '../controllers/answers';

router.post('/', controller.post);
router.get('/', controller.getAll);
router.get('/:id', controller.getOne);
router.get('/post/:id', controller.getAnswersForPost);
router.put('/:id', controller.put);
router.delete('/:id', controller.deleteOne);

module.exports = router;
