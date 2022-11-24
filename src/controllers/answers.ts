import express from 'express';
import { validId } from '../common/utilities';
import { db } from '../models';
const Answer = db.answers;

/////////
// POST
async function post(request: express.Request, response: express.Response): Promise<void> {
    // #swagger.tags = ['answers']
    try {
        if (!validId(request.body.postId, "Post", response)) { return; }

        if (!validId(request.body.userId, "User", response)) { return; }

        const now: Date = new Date();
        // Create a new document
        const document = {
            "postId": request.body.postId,
            "userId": request.body.userId,
            "content": request.body.content,
            "timestamp": now.toISOString,
            "likes": 0
        }

        const answer = await Answer.create(document);

        response.status(201).send(document);
    }
    catch (error: any) {
        response.status(500).send(error.message);
    }
}


////////
// GET
//
// getAll returns all documents from the collection.
async function getAll(request: express.Request, response: express.Response): Promise<void> {
    // #swagger.tags = ['answers']
    try {
        // Get all documents from this collection
        const answers = await Answer.find();

        response.send(answers);
    }
    catch (error: any) {
        response.status(500).send(error.message);
    }
}


// getOne returns one document specified by the ID parameter
async function getOne(request: express.Request, response: express.Response): Promise<void> {
    // #swagger.tags = ['answers']
    try {
        // Get the document specified by the ID in request.params.id
        const id = request.params.id;
        if (!validId(id, "", response)) { return; }

        const answer = await Answer.findById(id);
        if (!answer) {
            response.status(404).send();
            return;
        }
        
        response.send(answer);
    }
    catch (error: any) {
        response.status(500).send(error.message);
    }
}


////////
// PUT
async function put(request: express.Request, response: express.Response): Promise<void> {
    // #swagger.tags = ['answers']
    try {
        const id = request.params.id;
        if (!validId(id, "", response)) { return; }

        if (!validId(request.body.postId, "Post", response)) { return; }

        if (!validId(request.body.userId, "User", response)) { return; }


        const now: Date = new Date();
        // Create a new document
        const document = {
            "postId": request.body.postId,
            "userId": request.body.userId,
            "content": request.body.content,
            "timestamp": now.toISOString,
            "likes": request.body.likes
        }

        const answer = await Answer.findByIdAndUpdate(id, {$set: document});
        if (!answer) {
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
    // #swagger.tags = ['answers']
    try {
        const id = request.params.id;
        if (!validId(id, "", response)) { return; }

        // Delete the document specified by the ID in request.params.id
        const answer = await Answer.findByIdAndRemove(id);
        if (!answer) {
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
