import express from 'express';
const router = express.Router();
const controller = require('../controllers/answers');

router.post('/', controller.post);
router.get('/', controller.getAll);
router.get('/:id', controller.getOne);
router.put('/:id', controller.put);
router.delete('/:id', controller.deleteOne);

module.exports = router;
