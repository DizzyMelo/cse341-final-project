import express from 'express';

export interface Controller {
    post(request: express.Request, response: express.Response): Promise<void>;
    getAll(request: express.Request, response: express.Response): Promise<void>;
    getOne(request: express.Request, response: express.Response): Promise<void>;
    put(request: express.Request, response: express.Response): Promise<void>;
    delete(request: express.Request, response: express.Response): Promise<void>;
}
