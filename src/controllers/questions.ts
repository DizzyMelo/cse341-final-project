import express from 'express';
import { isValidObjectId } from 'mongoose';
import { db } from '../models';
const Question = db.questions;

/////////
// POST
async function post(request: express.Request, response: express.Response): Promise<void> {
    // #swagger.tags = ['questions']
    let question: any = {};

    try {
         // Create a new document
         const document = {
            "postId": request.body.postId,
            "content": request.body.content,
            "comments": []
        }

        question = await Question.create(document);

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
    // #swagger.tags = ['questions']
    try {
        // TODO: Get all documents from this collection
        response.send();
    }
    catch (error: any) {
        response.status(500).send(error.message);
    }
}


// getOne returns one document specified by the ID parameter
async function getOne(request: express.Request, response: express.Response): Promise<void> {
    // #swagger.tags = ['questions']
    try {
        // TODO: Get the document specified by the ID in request.params.id
        response.send();
    }
    catch (error: any) {
        response.status(500).send(error.message);
    }
}


////////
// PUT
async function put(request: express.Request, response: express.Response): Promise<void> {
    // #swagger.tags = ['questions']
    try {
        const id = request.params.id;
        if (!isValidObjectId(id)) {
            response.status(400).send(`ID: ${id} is not a valid MongoDB ObjectID`);
            return;
        }

        // TODO: check request.body.postId and request.body.comments for valid object IDs as well

        // Update the document specified by the ID in request.params.id
        const document = {
            "postId": request.body.postId,
            "content": request.body.content,
            "comments": request.body.comments
        }

        const question = await Question.findByIdAndUpdate(id, {$set: document});
        if (!question) {
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
    // #swagger.tags = ['questions']
    try {
        const id = request.params.id;
        if (!isValidObjectId(id)) {
            response.status(400).send(`ID: ${id} is not a valid MongoDB ObjectID`);
            return;
        }

        // Delete the document specified by the ID in request.params.id
        const question = await Question.findByIdAndRemove(id);
        if (!question) {
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
