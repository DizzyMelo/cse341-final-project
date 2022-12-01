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
      id = response.body[index]._id;  // Save the ID of one random answer
      expect(mongoose.isValidObjectId(id)).toBe(true);
    });
  });
