import server from "../src/server";
import request from "supertest";

describe("Try login with non existent user", () => {
    it ("should return 404 not found", () => {
        return request(server)
            .post("/api/v1/account/login")
            .send({username: 'Thomas Jones', password: 'password'})
            .expect(404);
    });
});

describe("Register", () => {
    it ("should return 201 created", () => {
        return request(server)
            .post("/api/v1/account/register")
            .send({username: 'John Smith', password: 'password'})
            .expect(201);
    });
});

describe("Try register twice", () => {
    it ("should return 409 conflict", () => {
        return request(server)
            .post("/api/v1/account/register")
            .send({username: 'John Smith', password: 'password123'})
            .expect(409);
    });
});
