"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const controller = require('../controllers/questions');
router.post('/', controller.post);
router.get('/', controller.getAll);
router.get('/:id', controller.getOne);
router.put('/:id', controller.put);
router.delete('/:id', controller.deleteOne);
module.exports = router;
