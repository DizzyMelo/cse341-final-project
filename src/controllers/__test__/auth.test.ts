import 'dotenv/config';
import request from "supertest";
import express from "express";
import { Server } from "http";
import mongoose from 'mongoose';
import { db } from '../../models';
import { isNullOrUndefined } from 'util';

let server: Server;
let connection: typeof mongoose;    // Mongoose connection

// Setup and Tear-down
beforeAll(() => {
db.mongoose.connect(db.url as string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as mongoose.ConnectOptions)
  .then((value: typeof mongoose) => { 
    connection = value;
  })
  .catch((error: any) => {
    console.log('Cannot connect to the Socrates database.', error);
  });
});

afterAll( async () => {
    if (connection !== undefined && connection !== null) {
        await connection.disconnect();
    }
});
  
beforeEach(() => {
  const app = express();
  app.use('/authorization', require('../../routes/auth'));
  server = app.listen();
});

afterEach(() => {
  server.close();
});

let id: mongoose.ObjectId;


// Tests
describe("login test", () => {
    test("login", async () => {
        const response = await request(server).get("/authorization/login");
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });
});

describe("logout test", () => {
    test("logout", async () => {
        const response = await request(server).get("/authorization/logout");
        expect(response.status).toBe(200);
    });
});


// TODO: Add tests for callback when it is ready to test