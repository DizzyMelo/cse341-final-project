"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const controller = require("../controllers/auth");
router.get("/login", controller.login);
router.get("/logout", controller.logout);
router.post("/callback", controller.callback);
module.exports = router;
