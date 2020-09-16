const app = require("../app");
const request = require("supertest");

describe("app", () => {
  describe("/graphql", () => {
    test("POST: 200 - responds with JSON for all experiences", () => {
      const query = { query: "{experiences {experience_id}}" };
      return request(app)
        .post("/graphql")
        .send(query)
        .expect(200)
        .then(({ body: { data } }) => console.log(data));
    });
  });
});
