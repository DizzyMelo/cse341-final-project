import request from "supertest";
import express from "express";
import { Server } from "http";
import { ObjectId } from 'mongoose';

let server: Server;


beforeEach(() => {
  const app = express();
  app.use('/authorization', require('../../routes/auth'));
  server = app.listen();
});

afterEach(() => {
  server.close();
});

let id: ObjectId;


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
