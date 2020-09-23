const app = require("../app");
const request = require("supertest");
const db = require("../db/connection");

describe("app error handling", () => {
  beforeEach(() => db.seed.run());
  afterAll(() => db.destroy());
  describe("/graphql", () => {
    describe("experience", () => {
      test("POST: 200 - returns an appropriate error message when passed a valid but non-existent experience_id", () => {
        const query = {
          query:
            '{experience(experience_id:"999") {title, body, username, likes}}',
        };
        return request(app)
          .post("/graphql")
          .send(query)
          .expect(200)
          .then(({ body: { data, errors } }) => {
            expect(data.experience).toBe(null);
            expect(errors[0].msg).toBe(
              "experience not found, invalid experience id"
            );
          });
      });
      test("POST: 200 - returns an appropriate error message when passed an invalid experience_id", () => {
        const query = {
          query:
            '{experience(experience_id:"beef") {title, body, username, likes}}',
        };
        return request(app)
          .post("/graphql")
          .send(query)
          .expect(200)
          .then(({ body: { data, errors } }) => {
            expect(data.experience).toBe(null);
            expect(errors[0].msg).toBe(
              "experience not found, invalid experience id"
            );
          });
      });
      test("POST: 200 - returns an appropriate error message when passed a malformed query", () => {
        const query = {
          query:
            '{experience(experience_idd:"1") {title, body, username, likes}}',
        };
        return request(app)
          .post("/graphql")
          .send(query)
          .expect(400)
          .then(({ body: { data, errors } }) => {
            expect(errors[0].msg).toBe(
              "unable to find experience, please check input"
            );
          });
      });
    });
    describe("experiences", () => {
      test("POST: 200 - returns an appropriate error message when passed a malformed query", () => {
        const query = {
          query: "{experiences {titleee, body, username, likes}}",
        };
        return request(app)
          .post("/graphql")
          .send(query)
          .expect(400)
          .then(({ body: { data, errors } }) => {
            expect(errors[0].msg).toBe(
              "unable to find experiences, please check input"
            );
          });
      });
    });
    describe("comments", () => {
      test.only("POST: 200 - returns an appropriate error message when passed a malformed query", () => {
        const query = {
          query: "{comments(experience_id: 1) {body extra_field}}",
        };
        return request(app)
          .post("/graphql")
          .send(query)
          .expect(400)
          .then(({ body: { data, errors } }) => {
            expect(errors[0].msg).toBe(
              "unable to find comments, please check input"
            );
          });
      });
    });
  });
});
