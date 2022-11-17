"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const User = models_1.db.users;
/////////
// POST
function post(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        // #swagger.tags = ['users']
        let user = {};
        try {
            // Create a new document
            const document = {
                "lastName": request.body.lastName,
                "firstName": request.body.firstName,
                "login": request.body.login,
                "email": request.body.email,
                "permissions": request.body.permissions,
                "questions": request.body.questions,
                "answers": request.body.answers,
                "likes": request.body.likes
            };
            user = yield User.create(document);
            response.status(201).send(document);
        }
        catch (error) {
            response.status(500).send(error.message);
        }
    });
}
////////
// GET
//
// getAll returns all documents in the collection.
function getAll(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        // #swagger.tags = ['users']
        try {
            // TODO: Get all documents from this collection
            const users = yield User.find();
            response.send(users);
        }
        catch (error) {
            response.status(500).send(error.message);
        }
    });
}
// getOne returns one document specified by the ID parameter
function getOne(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        // #swagger.tags = ['users']
        try {
            // TODO: Get the document specified by the ID in request.params.id
            const id = request.params.id;
            const user = yield User.findById(id);
            response.send(user);
        }
        catch (error) {
            response.status(500).send(error.message);
        }
    });
}
////////
// PUT
function put(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        // #swagger.tags = ['users']
        try {
            // Update the document specified by the ID in request.params.id
            const document = {
                "lastName": request.body.lastName,
                "firstName": request.body.firstName,
                "login": request.body.login,
                "email": request.body.email,
                "permissions": request.body.permissions,
                "questions": request.body.questions,
                "answers": request.body.answers,
                "likes": request.body.likes
            };
            const user = yield User.findByIdAndUpdate(request.params.id, { $set: document });
            response.status(204).send();
        }
        catch (error) {
            response.status(500).send(error.message);
        }
    });
}
///////////
// DELETE 
function deleteOne(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        // #swagger.tags = ['users']
        try {
            // TODO: Delete the document specified by the ID in request.params.id
            const user = yield User.findByIdAndRemove(request.params.id);
            response.send();
        }
        catch (error) {
            response.status(500).send(error.message);
        }
    });
}
module.exports = {
    post,
    getAll,
    getOne,
    put,
    deleteOne
};
