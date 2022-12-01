import 'dotenv/config';
import request from "supertest";
import express from "express";
import { Server } from "http";
import mongoose from 'mongoose';
import { db } from '../../models';

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
    //process.exit();
  });
});

afterAll( async () => {
    await connection.disconnect();
});
  
beforeEach(() => {
  const app = express();
  app.use('/users', require('../../routes/users'));
  server = app.listen();
});

afterEach(() => {
  server.close();
});

let id: mongoose.ObjectId;


// Tests

describe("Get all users", () => {
  test("Get all users", async () => {
    const response = await request(server).get("/users");
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    id = response.body[0]._id;  // Save the ID of the first user
    expect(mongoose.isValidObjectId(id)).toBe(true);
  });
});

describe("Get one user", () => {
    test("Get one user", async () => {
        const response = await request(server).get(`/users/${id.toString()}`);
        expect(response.status).toBe(200);
        expect(Object.keys(response.body).length).toBeGreaterThan(0); // Response body must not be empty
        expect(response.body.hasOwnProperty('_id')).toBe(true);
        expect(response.body._id).toBe(id);
        expect(response.body.hasOwnProperty('lastName')).toBe(true);
        expect(response.body.hasOwnProperty('firstName')).toBe(true);
        expect(response.body.hasOwnProperty('login')).toBe(true);
        expect(response.body.hasOwnProperty('email')).toBe(true);
        expect(response.body.hasOwnProperty('organization')).toBe(true);
        expect(response.body.hasOwnProperty('permissions')).toBe(true);
        expect(response.body['permissions'].length).toBeGreaterThan(0);
        expect(response.body.hasOwnProperty('updated')).toBe(true);
        expect(response.body.hasOwnProperty('likes')).toBe(true);
    });
});
