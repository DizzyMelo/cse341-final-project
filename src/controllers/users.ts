import express from 'express';
import { isValidObjectId } from 'mongoose';
import { db } from '../models';
const User = db.users;

/////////
// POST
async function post(request: express.Request, response: express.Response): Promise<void> {
    // #swagger.tags = ['users']
    let user: any = {};

    try {
        // TODO: Check the request.body.login to see if the login is already in use.

        const now: Date = new Date();

        // Create a new document
        const document = {
            "lastName": request.body.lastName,
            "firstName": request.body.firstName,
            "login": request.body.login,
            "email": request.body.email,
            "organization": request.body.organization,
            "permissions": request.body.permissions,
            "created": now.toISOString(),
            "updated": now.toISOString(),
            "likes": 0
        }

        user = await User.create(document);

        response.status(201).send(user);
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
        // Get all documents from this collection
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
        // Get the document specified by the ID in request.params.id
        const id = request.params.id;
        if (!isValidObjectId(id)) {
            response.status(400).send(`ID: ${id} is not a valid MongoDB ObjectID`);
            return;
        }

        const user = await User.findById(id);
        if (!user) {
            response.status(404).send();
            return;
        }
        
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
        const id = request.params.id;
        if (!isValidObjectId(id)) {
            response.status(400).send(`ID: ${id} is not a valid MongoDB ObjectID`);
            return;
        }

        const now: Date = new Date();

        // Update the document specified by the ID in request.params.id
        const document = {
            "lastName": request.body.lastName,
            "firstName": request.body.firstName,
            "login": request.body.login,
            "email": request.body.email,
            "organization": request.body.organization,
            "permissions": request.body.permissions,
            "created": request.body.created,
            "updated": now.toISOString(),
            "likes": request.body.likes
        }

        const user = await User.findByIdAndUpdate(id, {$set: document});
        if (!user) {
            response.status(404).send();
            return;
        }
        
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
        const id = request.params.id;
        if (!isValidObjectId(id)) {
            response.status(400).send(`ID: ${id} is not a valid MongoDB ObjectID`);
            return;
        }

        // Delete the document specified by the ID in request.params.id
        const user = await User.findByIdAndRemove(id);
        if (!user) {
            response.status(404).send();
            return;
        }

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
