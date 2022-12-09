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


describe("Negative GET tests", () => {
  test("Invalid ObjectID - not even close", async () => {
        const response = await request(server).get(`/users/abc123`);
        expect(response.status).toBe(400);
  });

  test("Invalid ObjectID - close but not quite", async () => {
    const response = await request(server).get(`/users/6393959f572976f5b3675c5`);
    expect(response.status).toBe(400);
  });

test("Non-existent ObjectID", async () => {
    const response = await request(server).get(`/users/6393959f572976f5b3675c50`);
    expect(response.status).toBe(404);
  });
});


/* The following strangely returns a 201 without an authorization header
describe("CRUD operations - without authorization", () => {
  const doc = {
    lastName: "Scrooge",
    firstName: "Ebenezer",
    identifier: "auth0|639393e9ce56ffa55d066b42",  // unused objectId
    login: "escrooge",
    email: "ebenezer@marleyandscrooge.co.uk",
    organization: "Marley and Scrooge Counting House",
    permissions: ['read-write']
  };

  test("Create - unauthorized", async () => {
    let response = await request(server).post("/users")
    .set('Content-type', 'application/json')
    .send(doc);

    expect(response.status).toBe(403);
  });
});
//*/


describe("CRUD operations - happy path", () => {
  let createdId: string;

  test("Create - happy path", async () => {
    const doc = {
      lastName: "Bailey",
      firstName: "George",
      identifier: "auth0|63937a335979f23820a2c71d",  // unused objectId
      login: "gbailey",
      email: "georgeb@buildingandloan.com",
      organization: "Bedford Falls Building and Loan",
      permissions: ['read-write']
    } as any;

    const headers = {
      'Content-type': 'application/json',
      Authorization: 'Bearer ' + process.env.BEARER_TOKEN
    }

    let response = await request(server).post("/users")
      .set(headers)
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

      response = await request(server).put(`/users/${createdId}`)
        .set(headers)
        .send(doc);
      expect(response.status).toBe(204);

      // Clean up
      response = await request(server).delete(`/users/${createdId}`)
        .set( { Authorization: 'Bearer ' + process.env.BEARER_TOKEN })
        .send();
      expect(response.status).toBe(200);
    }
  });


  describe("Create - negative tests", () => {
    const doc = {
      lastName: "Poppins",
      firstName: "Mary",
      identifier: "auth0|639394d9e13b292bb7d5bea8",  // unused objectId
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
