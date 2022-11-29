import 'dotenv/config';
import request from "supertest";
import express from "express";
import { Server } from "http";
import mongoose from 'mongoose';
import { db } from '../../models';

let server: Server;
let connection: typeof mongoose;    // Mongoose connection

// TODO: Set up Mockingoose mocks
beforeAll(() => {
db.mongoose.connect(db.url as string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as mongoose.ConnectOptions)
  .then((value: typeof mongoose) => { 
    //console.log('Connected to the Socrates database.')
    connection = value;
  })
  .catch((error: any) => {
    console.log('Cannot connect to the Socrates database.', error);
    //process.exit();
  });
});

afterAll(() => {
    connection.disconnect();
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

describe("Get all users", () => {
  test("Get all users", async () => {
    const response = await request(server).get("/users");
    //console.log(response.body);
    //expect(response.body).toEqual({ foo: "changed" });
    expect(response.body).toBeTruthy();
    expect(response.body.length).toBeGreaterThan(0);
    id = response.body[0]._id;
    expect(mongoose.isValidObjectId(id)).toBe(true);
  });
});

describe("Get one user", () => {
    test("Get one user", async () => {
        const response = await request(server).get(`/users/${id.toString()}`);
        expect(response.body).toBeTruthy();
        expect(response.body._id).toBe(id);
    });
});

