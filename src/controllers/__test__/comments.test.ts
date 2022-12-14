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
  app.use('/comments', require('../../routes/comments'));
  server = app.listen();
});

afterEach(() => {
  server.close();
});

let id: mongoose.ObjectId;


// Tests

describe("Get all comments", () => {
  test("Get all comments", async () => {
    const response = await request(server).get("/comments");
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    let index: number = Math.floor(Math.random() * (response.body.length - 1));
    id = response.body[index]._id;  // Save the ID of one random comment
    expect(mongoose.isValidObjectId(id)).toBe(true);
  });

  test("Get one commment", async () => {
    const response = await request(server).get(`/comments/${id.toString()}`);
    expect(response.status).toBe(200);
    expect(Object.keys(response.body).length).toBeGreaterThan(0); // Response body must not be empty
    expect(response.body.hasOwnProperty('_id')).toBe(true);
    expect(response.body._id).toBe(id);
    expect(response.body.hasOwnProperty('parent')).toBe(true);
    expect(mongoose.isValidObjectId(response.body.parent)).toBe(true);
    expect(response.body.hasOwnProperty('userId')).toBe(true);
    expect(mongoose.isValidObjectId(response.body.userId)).toBe(true);
    expect(response.body.hasOwnProperty('content')).toBe(true);
    expect(response.body.content.length).toBeGreaterThan(0);
    expect(response.body.hasOwnProperty('likes')).toBe(true);
  });
});


describe("Negative GET tests", () => {
  test("Invalid ObjectID - not even close", async () => {
        const response = await request(server).get(`/comments/abc123`);
        expect(response.status).toBe(400);
  });

  test("Invalid ObjectID - close but not quite", async () => {
    const response = await request(server).get(`/comments/6393959f572976f5b3675c5`);
    expect(response.status).toBe(400);
  });

  test("Non-existent ObjectID", async () => {
    const response = await request(server).get(`/comments/6393959f572976f5b3675c50`);
    expect(response.status).toBe(404);
  });
});
  