import express from 'express';
const router = express.Router();
const controller = require('../controllers/users');

router.post('/', controller.post);
router.get('/', controller.getAll);
router.get('/:id', controller.getOne);
router.get('/email/:id', controller.getUserByEmail);
router.get('/login/:id', controller.getUserByLogin);
router.put('/:id', controller.put);
router.delete('/:id', controller.deleteOne);

module.exports = router;
