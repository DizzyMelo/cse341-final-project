import express from 'express';
const router = express.Router();
//const controller = require('../controllers/users');
import { Users } from '../controllers/users';

const users = new Users();

router.post('/', users.post);
router.get('/', users.getAll);
router.get('/:id', users.getOne);
router.put('/:id', users.put);
router.delete('/:id', users.delete);

/*
router.post('/', controller.postUser);
router.get('/', controller.getUsers);
router.get('/:id', controller.getUser);
router.put('/:id', controller.putUser);
router.delete('/:id', controller.deleteUser);
*/

module.exports = router;
