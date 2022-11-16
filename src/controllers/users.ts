import express from 'express';
import { Controller } from './controller'

const implemented: boolean = false;     // Change to true when methods are fully implemented

export class Users implements Controller {

    /////////
    // POST
    async post(request: express.Request, response: express.Response): Promise<void> {
        // #swagger.tagx = ['users']
        if (implemented) {
            try {
                // TODO: Create a new document
                response.status(201).send();
            }
            catch (error: any) {
                response.status(500).send(error.message);
            }
        }
        else {
            response.status(501).send('Not yet implemented');
        }
    }

    ////////
    // GET
    //
    // getAll returns all records from the collection.
    async getAll(request: express.Request, response: express.Response): Promise<void> {
        // #swagger.tagx = ['users']
        if (implemented) {
            try {
                // TODO: Get all documents from this collection
                response.send();
            }
            catch (error: any) {
                response.status(500).send(error.message);
            }
        }
        else {
            response.status(501).send('Not yet implemented');
        }
    }

    // getOne returns one document specified by the ID parameter
    async getOne(request: express.Request, response: express.Response): Promise<void> {
        // #swagger.tagx = ['users']
        if (implemented) {
            try {
                // TODO: Get the document specified by the ID in request.params.id
                response.send();
            }
            catch (error: any) {
                response.status(500).send(error.message);
            }
        }
        else {
            response.status(501).send('Not yet implemented');
        }
    }

    ////////
    // PUT
    async put(request: express.Request, response: express.Response): Promise<void> {
        // #swagger.tagx = ['users']
        if (implemented) {
            try {
                // TODO: Update the document specified by the ID in request.params.id
                response.status(204).send();
            }
            catch (error: any) {
                response.status(500).send(error.message);
            }
        }
        else {
            response.status(501).send('Not yet implemented');
        }
    }

    ///////////
    // DELETE 
    async delete(request: express.Request, response: express.Response): Promise<void> {
        // #swagger.tagx = ['users']
        if (implemented) {
            try {
                // TODO: Delete the document specified by the ID in request.params.id
                response.send();
            }
            catch (error: any) {
                response.status(500).send(error.message);
            }
        }
        else {
            response.status(501).send('Not yet implemented');
        }
    }
}

/*
/////////
// POST
async function postUser(request: express.Request, response: express.Response): Promise<void> {
    // #swagger.tagx = ['users']
    response.status(201).send();
    response.status(501).send('Not yet implemented');
}


////////
// GET
//
// getUsers returns all users.
async function getUsers(request: express.Request, response: express.Response): Promise<void> {
    // #swagger.tagx = ['users']
    response.send();
    response.status(501).send('Not yet implemented');
}


// getUser returns one user specified by the ID parameter
async function getUser(request: express.Request, response: express.Response): Promise<void> {
    // #swagger.tagx = ['users']
    response.send();
    response.status(501).send('Not yet implemented');
}


////////
// PUT
async function putUser(request: express.Request, response: express.Response): Promise<void> {
    // #swagger.tagx = ['users']
    response.status(204).send();
    response.status(501).send('Not yet implemented');
}


///////////
// DELETE 
async function deleteUser(request: express.Request, response: express.Response): Promise<void> {
    // #swagger.tagx = ['users']
    try {
        response.send();
    }
    catch (error: any) {
        response.status(500).send(error.message);
    }
    response.status(501).send('Not yet implemented');
}

module.exports = {
    postUser,
    getUsers,
    getUser,
    putUser,
    deleteUser
}
*/