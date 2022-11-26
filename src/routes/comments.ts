import express from 'express';
const router = express.Router();
const controller = require('../controllers/comments');

router.post('/', controller.post);
router.get('/', controller.getAll);
router.get('/:id', controller.getOne);
router.get('/answer/:id', controller.getCommentsForAnswer);
router.get('/post/:id', controller.getCommentsForPost);
router.put('/:id', controller.put);
router.delete('/:id', controller.deleteOne);

module.exports = router;
