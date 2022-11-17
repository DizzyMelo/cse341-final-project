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
/////////
// POST
function post(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        // #swagger.tags = ['answers']
        let doc = [];
        try {
            // TODO: Create a new document
            response.status(201).send(doc);
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
        // #swagger.tags = ['answers']
        try {
            // TODO: Get all documents from this collection
            response.send();
        }
        catch (error) {
            response.status(500).send(error.message);
        }
    });
}
// getOne returns one document specified by the ID parameter
function getOne(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        // #swagger.tags = ['answers']
        try {
            // TODO: Get the document specified by the ID in request.params.id
            response.send();
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
        // #swagger.tags = ['answers']
        try {
            // TODO: Update the document specified by the ID in request.params.id
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
        // #swagger.tags = ['answers']
        try {
            // TODO: Delete the document specified by the ID in request.params.id
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
