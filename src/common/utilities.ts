import express from 'express';
import { isValidObjectId } from 'mongoose';

export const validId = (id: string, text: string, response: express.Response): boolean => {
    if (!isValidObjectId(id)) {
        response.status(400).send(`${text} ID: ${id} is not a valid MongoDB ObjectID`);
        return false;
    }

    return true;
}
