"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    lastName: { type: String, required: true },
    firstName: { type: String, required: true },
    login: { type: String, required: true },
    email: { type: String, required: true },
    permissions: [{ type: mongoose_1.Schema.Types.Mixed, required: true }],
    questions: [{ type: mongoose_1.Schema.Types.ObjectId }],
    answers: [{ type: mongoose_1.Schema.Types.ObjectId }],
    likes: { type: Number }
});
exports.default = (0, mongoose_1.model)('User', userSchema);
