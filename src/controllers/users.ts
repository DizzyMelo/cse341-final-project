import express from 'express';

/////////
// POST
async function postUser(request: express.Request, response: express.Response): Promise<void> {
    // #swagger.tagx = ['users']
    response.status(501).send('Not yet implemented');
}


////////
// GET
//
// getUsers returns all users.
async function getUsers(request: express.Request, response: express.Response): Promise<void> {
    // #swagger.tagx = ['users']
    response.status(501).send('Not yet implemented');
}


// getUser returns one user specified by the ID parameter
async function getUser(request: express.Request, response: express.Response): Promise<void> {
    // #swagger.tagx = ['users']
    response.status(501).send('Not yet implemented');
}


////////
// PUT
async function putUser(request: express.Request, response: express.Response): Promise<void> {
    // #swagger.tagx = ['users']
    response.status(501).send('Not yet implemented');
}


///////////
// DELETE 
async function deleteUser(request: express.Request, response: express.Response): Promise<void> {
    // #swagger.tagx = ['users']
    response.status(501).send('Not yet implemented');
}

module.exports = {
    postUser,
    getUsers,
    getUser,
    putUser,
    deleteUser
}
