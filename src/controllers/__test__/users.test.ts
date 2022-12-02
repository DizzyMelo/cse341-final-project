import 'dotenv/config';
import request from "supertest";
import express from "express";
import { Server } from "http";
import mongoose, { ObjectId } from 'mongoose';
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
  app.use(express.json());        // With Express 4.16 and later, we no longer need body-parser.  Express does it.
  app.use(express.urlencoded({ extended: true }));  // Must use extended option
  app.use('/users', require('../../routes/users'));
  server = app.listen();
});

afterEach(() => {
  server.close();
});

let id: ObjectId;
let email: string = "";
let login: string = "";


// Tests

describe("Get all users", () => {
  test("Get all users", async () => {
    const response = await request(server).get("/users");
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
    let index: number = Math.floor(Math.random() * (response.body.length - 1));
    id = response.body[index]._id;  // Save the ID of a random user
    email = response.body[index].email;
    login = response.body[index].login;
    expect(mongoose.isValidObjectId(id)).toBe(true);
  });
});

describe("Get one user", () => {
    test("Get one user by ID", async () => {
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

    test("Get one user by email", async () => {
      const response = await request(server).get(`/users/email/${email}`);
      expect(response.status).toBe(200);
      expect(Object.keys(response.body).length).toBeGreaterThan(0); // Response body must not be empty
      expect(response.body.hasOwnProperty('_id')).toBe(true);
      expect(response.body._id).toBe(id);
      expect(response.body.email).toBe(email);
    });

    test("Get one user by login", async () => {
      const response = await request(server).get(`/users/login/${login}`);
      expect(response.status).toBe(200);
      expect(Object.keys(response.body).length).toBeGreaterThan(0); // Response body must not be empty
      expect(response.body.hasOwnProperty('_id')).toBe(true);
      expect(response.body._id).toBe(id);
      expect(response.body.login).toBe(login);
    });
});



describe("CRUD operations", () => {
  let createdId: string;

  test("Create - happy path", async () => {
    const doc = {
      lastName: "Bailey",
      firstName: "George",
      login: "gbailey",
      email: "georgeb@buildingandloan.com",
      organization: "Bedford Falls Building and Loan",
      permissions: ['read-write']
    } as any;

    let response = await request(server).post("/users")
      .set('Content-type', 'application/json')
      .send(doc);

    expect(response.status).toBe(201);
    expect(Object.keys(response.body).length).toBeGreaterThan(0); // Response body must not be empty
    expect(response.body.hasOwnProperty('_id')).toBe(true);
    createdId = response.body._id;
    expect(mongoose.isValidObjectId(createdId)).toBe(true);

    let created: boolean = createdId !== undefined && createdId !== null;

    if (created) {
      // Add a "like" and PUT
      doc.likes = 1;

      response = await request(server).put(`/users/${createdId}`);
      expect(response.status).toBe(204);

      // Clean up
      response = await request(server).delete(`/users/${createdId}`);
      expect(response.status).toBe(200);
    }
  });

  describe("Create - negative tests", () => {
    const doc = {
      lastName: "Poppins",
      firstName: "Mary",
      login: "poppinsm",
      email: "poppinsm@banksmanor.uk",
      organization: "Banks Family",
      permissions: ['read-write']
    };

    test("Create - missing lastName", async () => {
      const clone = {...doc};
      clone.lastName = "";

      let response = await request(server).post("/users")
        .set('Content-type', 'application/json')
        .send(clone);

      expect(response.status).toBe(500);
    });

    test("Create - missing firstName", async () => {
      const clone = {...doc};
      clone.firstName = "";

      let response = await request(server).post("/users")
        .set('Content-type', 'application/json')
        .send(clone);

      expect(response.status).toBe(500);
    });
  });
});
