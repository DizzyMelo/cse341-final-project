import express from 'express';
import { validId } from '../common/utilities';
import { db } from '../models';
const Comment = db.comments;


/////////
// POST
async function post(request: express.Request, response: express.Response): Promise<void> {
    // #swagger.tags = ['comments']
    try {
        if (!validId(request.body.userId, "User", response)) { return; }

        if (!validId(request.body.parent, "Parent", response)) { return; }

        const now: Date = new Date();
        // Create a new document
        const document = {
            "userId": request.body.userId,
            "content": request.body.content,
            "parent": request.body.parent,
            "timestamp": now.toISOString,
            "likes": 0
        }

        const comment = await Comment.create(document);

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
    // #swagger.tags = ['comments']
    try {
        // Get all documents from this collection
        const comments = await Comment.find();

        response.send(comments);
    }
    catch (error: any) {
        response.status(500).send(error.message);
    }
}


// getOne returns one document specified by the ID parameter
async function getOne(request: express.Request, response: express.Response): Promise<void> {
    // #swagger.tags = ['comments']
    try {
        // Get the document specified by the ID in request.params.id
        const id = request.params.id;
        if (!validId(id, "", response)) { return; }

        const comment = await Comment.findById(id);
        if (!comment) {
            response.status(404).send();
            return;
        }
        
        response.send(comment);
    }
    catch (error: any) {
        response.status(500).send(error.message);
    }
}


// getCommentsForPost returns an array of comments for a specified Post ID parameter.
async function getCommentsForPost(request: express.Request, response: express.Response): Promise<void> {
    // #swagger.tags = ['comments']
    response.status(501).send();    // Not Implemented
}


// getCommentsForAnswer returns an array of comments for a specified Answer ID parameter.
async function getCommentsForAnswer(request: express.Request, response: express.Response): Promise<void> {
    // #swagger.tags = ['comments']
    response.status(501).send();    // Not Implemented
}


////////
// PUT
async function put(request: express.Request, response: express.Response): Promise<void> {
    // #swagger.tags = ['comments']
    try {
        const id = request.params.id;
        if (!validId(id, "", response)) { return; }

        if (!validId(request.body.userId, "User", response)) { return; }

        if (!validId(request.body.parent, "Parent", response)) { return; }


        const now: Date = new Date();
        // Create a new document
        const document = {
            "userId": request.body.userId,
            "content": request.body.content,
            "parent": request.body.parent,
            "timestamp": now.toISOString,
            "likes": request.body.likes
        }

        const comment = await Comment.findByIdAndUpdate(id, {$set: document});
        if (!comment) {
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
    // #swagger.tags = ['comments']
    try {
        const id = request.params.id;
        if (!validId(id, "", response)) { return; }

        // Delete the document specified by the ID in request.params.id
        const comment = await Comment.findByIdAndRemove(id);
        if (!comment) {
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
    getCommentsForAnswer,
    getCommentsForPost,
    put,
    deleteOne
}
