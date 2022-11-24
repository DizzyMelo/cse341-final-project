import express from 'express';
import { isValidObjectId } from 'mongoose';
import { db } from '../models';
const Post = db.posts;

/////////
// POST
async function post(request: express.Request, response: express.Response): Promise<void> {
    // #swagger.tags = ['questions']
    let question: any = {};

    try {
        const now: Date = new Date();
        // Create a new document
        const document = {
            "userId": request.body.userId,
            "title": request.body.title,
            "question": request.body.question,
            "timestamp": now.toISOString,
            "likes": 0
        }

        const post = await Post.create(document);

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
        // Get all documents from this collection
        const questions = await Question.find();

        response.send(questions);
    }
    catch (error: any) {
        response.status(500).send(error.message);
    }
}


// getOne returns one document specified by the ID parameter
async function getOne(request: express.Request, response: express.Response): Promise<void> {
    // #swagger.tags = ['questions']
    try {
        // Get the document specified by the ID in request.params.id
        const id = request.params.id;
        if (!isValidObjectId(id)) {
            response.status(400).send(`ID: ${id} is not a valid MongoDB ObjectID`);
            return;
        }

        const question = await Question.findById(id);
        if (!question) {
            response.status(404).send();
            return;
        }
        
        response.send(question);
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

        const now: Date = new Date();
        // Create a new document
        const document = {
            "userId": request.body.userId,
            "title": request.body.title,
            "question": request.body.question,
            "timestamp": now.toISOString,
            "likes": request.body.likes
        }

        const post = await Post.create(document);
        if (!post) {
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
