import {Request, Response} from 'express';
import { isValidObjectId } from 'mongoose';
import { db } from '../models';
const Post = db.posts;

/////////
// POST
async function post(request: Request, response: Response): Promise<void> {
    // #swagger.tags = ['posts']
    try {
        const now: Date = new Date();
        // Create a new document
        const document = {
            "userId": request.body.userId,
            "title": request.body.title,
            "question": request.body.question,
            "updated": now.toISOString(),
            "likes": 0
        }

        const post = await Post.create(document);

        response.status(201).send(post);
    }
    catch (error) {
        if (error instanceof Error) response.status(500).send(error.message);
        else response.status(500).send(error);
    }
}


////////
// GET
//
// getAll returns all documents from the collection.
async function getAll(request: Request, response: Response): Promise<void> {
    // #swagger.tags = ['posts']
    try {
        // Get all documents from this collection
        const questions = await Post.find();

        response.send(questions);
    }
    catch (error) {
        if (error instanceof Error) response.status(500).send(error.message);
        else response.status(500).send(error);
    }
}


// getOne returns one document specified by the ID parameter
async function getOne(request: Request, response: Response): Promise<void> {
    // #swagger.tags = ['posts']
    try {
        // Get the document specified by the ID in request.params.id
        const id = request.params.id;
        if (!isValidObjectId(id)) {
            response.status(400).send(`ID: ${id} is not a valid MongoDB ObjectID`);
            return;
        }

        const question = await Post.findById(id);
        if (!question) {
            response.status(404).send();
            return;
        }
        
        response.send(question);
    }
    catch (error) {
        if (error instanceof Error) response.status(500).send(error.message);
        else response.status(500).send(error);
    }
}


////////
// PUT
async function put(request: Request, response: Response): Promise<void> {
    // #swagger.tags = ['posts']
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
            "updated": now.toISOString(),
            "likes": request.body.likes
        }

        const post = await Post.findByIdAndUpdate(id, {$set: document});
        if (!post) {
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
    // #swagger.tags = ['posts']
    try {
        const id = request.params.id;
        if (!isValidObjectId(id)) {
            response.status(400).send(`ID: ${id} is not a valid MongoDB ObjectID`);
            return;
        }

        // Delete the document specified by the ID in request.params.id
        const post = await Post.findByIdAndRemove(id);
        if (!post) {
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
    put,
    deleteOne
}
