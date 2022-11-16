import express from 'express';
const router = express.Router();
const controller = require('../controllers/users');

router.post('/', controller.postUser);
router.get('/', controller.getUsers);
router.get('/:id', controller.getUser);
router.put('/:id', controller.putUser);
router.delete('/:id', controller.deleteUser);

module.exports = router;
