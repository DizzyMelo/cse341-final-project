import express from 'express';
const router = express.Router();
import controller from '../controllers/comments';

router.post('/', controller.post);
router.get('/', controller.getAll);
router.get('/:id', controller.getOne);
router.get('/answer/:id', controller.getComments);
router.get('/post/:id', controller.getComments);
router.put('/:id', controller.put);
router.delete('/:id', controller.deleteOne);

module.exports = router;
