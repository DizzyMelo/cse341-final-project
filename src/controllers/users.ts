import {Request, Response} from 'express';
import { isValidObjectId } from 'mongoose';
import { db } from '../models';
const User = db.users;

/////////
// POST
//
// No longer used
// Superseded by findOrCreateUser() in ../middleware/loadUser.ts
//
async function post(request: Request, response: Response): Promise<void> {
    // #swagger.tags = ['users']

    try {
        const now: Date = new Date();

        // Create a new document
        const document = {
            "identifier": request.body.identifier,
            "lastName": request.body.lastName,
            "firstName": request.body.firstName,
            "login": request.body.login,
            "email": request.body.email,
            "organization": request.body.organization,
            "permissions": request.body.permissions,
            "updated": now.toISOString(),
            "likes": 0
        }

        const user = await User.create(document);

        response.status(201).send(user);
    }
    catch (error) {
        if (error instanceof Error) response.status(500).send(error.message);
        else response.status(500).send(error);
    }
}


////////
// GET
//
// getAll returns all documents in the collection.
async function getAll(request: Request, response: Response): Promise<void> {
    // #swagger.tags = ['users']
    try {
        // Get all documents from this collection
        const users = await User.find();

        response.send(users);
    }
    catch (error) {
        if (error instanceof Error) response.status(500).send(error.message);
        else response.status(500).send(error);
    }
}


// getOne returns one document specified by the ID parameter
async function getOne(request: Request, response: Response): Promise<void> {
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
    catch (error) {
        if (error instanceof Error) response.status(500).send(error.message);
        else response.status(500).send(error);
    }
}


// getUserByEmail returns a User document according to the email address field specified by the ID parameter
async function getUserByEmail(request: Request, response: Response): Promise<void> {
    // #swagger.tags = ['users']
    const id =  request.params.id;

    const user = await User.findOne({ email: id });

    if (!user) {
        response.status(404).send();
        return;
    }

    response.send(user);
}


// getUserByLogin returns a User document according to Login ID specified by the ID parameter
async function getUserByLogin(request: Request, response: Response): Promise<void> {
    // #swagger.tags = ['users']
    const id =  request.params.id;

    const user = await User.findOne({ login: id });

    if (!user) {
        response.status(404).send();
        return;
    }

    response.send(user);
}


////////
// PUT
async function put(request: Request, response: Response): Promise<void> {
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
            "identifier": request.body.identifier,
            "lastName": request.body.lastName,
            "firstName": request.body.firstName,
            "login": request.body.login,
            "email": request.body.email,
            "organization": request.body.organization,
            "permissions": request.body.permissions,
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
    catch (error) {
        if (error instanceof Error) response.status(500).send(error.message);
        else response.status(500).send(error);
    }
}


///////////
// DELETE 
async function deleteOne(request: Request, response: Response): Promise<void> {
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
    catch (error) {
        if (error instanceof Error) response.status(500).send(error.message);
        else response.status(500).send(error);
    }
}

export default {
    post,
    getAll,
    getOne,
    getUserByEmail,
    getUserByLogin,
    put,
    deleteOne
}
