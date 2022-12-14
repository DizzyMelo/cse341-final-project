import {Request, Response} from 'express';
import { ObjectId } from 'mongodb';
import { validId } from '../common/utilities';
import { db } from '../models';
const Comment = db.comments;


/////////
// POST
async function post(request: Request, response: Response): Promise<void> {
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
            "updated": now.toISOString(),
            "likes": 0
        }

        const comment = await Comment.create(document);

        response.status(201).send(comment);
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
    // #swagger.tags = ['comments']
    try {
        // Get all documents from this collection
        const comments = await Comment.find();

        response.send(comments);
    }
    catch (error) {
        if (error instanceof Error) response.status(500).send(error.message);
        else response.status(500).send(error);
    }
}


// getOne returns one document specified by the ID parameter
async function getOne(request: Request, response: Response): Promise<void> {
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
    catch (error) {
        if (error instanceof Error) response.status(500).send(error.message);
        else response.status(500).send(error);
    }
}



// getComments returns an array of comments for a specified Answer ID or Post ID parameter.
async function getComments(request: Request, response: Response): Promise<void> {
    // #swagger.tags = ['comments']
    const id =  request.params.id;

    if (!validId(id, "Answer", response)) { return; }

    const comments = await Comment.find({ parent: new ObjectId(id) });

    if (!comments || comments.length === 0) {
        response.status(404).send();
        return;
    }

    response.send(comments);
}


////////
// PUT
async function put(request: Request, response: Response): Promise<void> {
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
            "updated": now.toISOString(),
            "likes": request.body.likes
        }

        const comment = await Comment.findByIdAndUpdate(id, {$set: document});
        if (!comment) {
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
    catch (error) {
        if (error instanceof Error) response.status(500).send(error.message);
        else response.status(500).send(error);
    }
}

export default {
    post,
    getAll,
    getOne,
    getComments,
    put,
    deleteOne
}
