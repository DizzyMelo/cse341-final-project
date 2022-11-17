import { setDefaultResultOrder } from 'dns';
import express from 'express';
import { db } from '../models';
const User = db.users;

/////////
// POST
async function post(request: express.Request, response: express.Response): Promise<void> {
    // #swagger.tags = ['users']
    let user: any = {};

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
        }

        user = await User.create(document);

        response.status(201).send(document);
    }
    catch (error: any) {
        response.status(500).send(error.message);
    }
}


////////
// GET
//
// getAll returns all documents in the collection.
async function getAll(request: express.Request, response: express.Response): Promise<void> {
    // #swagger.tags = ['users']
    try {
        // TODO: Get all documents from this collection
        const users = await User.find();

        response.send(users);
    }
    catch (error: any) {
        response.status(500).send(error.message);
    }
}


// getOne returns one document specified by the ID parameter
async function getOne(request: express.Request, response: express.Response): Promise<void> {
    // #swagger.tags = ['users']
    try {
        // TODO: Get the document specified by the ID in request.params.id
        const id = request.params.id;

        const user = await User.findById(id);
        
        response.send(user);
    }
    catch (error: any) {
        response.status(500).send(error.message);
    }
}


////////
// PUT
async function put(request: express.Request, response: express.Response): Promise<void> {
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
        }

        const user = await User.findByIdAndUpdate(request.params.id, {$set: document});

        response.status(204).send();
    }
    catch (error: any) {
        response.status(500).send(error.message);
    }
}


///////////
// DELETE 
async function deleteOne(request: express.Request, response: express.Response): Promise<void> {
    // #swagger.tags = ['users']
    try {
        // TODO: Delete the document specified by the ID in request.params.id
        const user = await User.findByIdAndRemove(request.params.id);
        response.send();
    }
    catch (error: any) {
        response.status(500).send(error.message);
    }
}

module.exports = {
    post,
    getAll,
    getOne,
    put,
    deleteOne
}
