import express from 'express';
const router = express.Router();
const controller = require("../controllers/auth");

router.get("/login", controller.login);
router.get("/logout", controller.logout);
router.get("/callback", controller.callback);

module.exports = router;