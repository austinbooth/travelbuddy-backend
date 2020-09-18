process.env.NODE_ENV = "test";

const app = require("../app");
const request = require("supertest");
const db = require("../db/connection");

beforeEach(() => db.seed.run());

describe("app", () => {
  afterAll(() => connection.destroy());
  describe("/graphql", () => {
    test("POST: 200 - adds a new experience", () => {
      return request(app)
        .post("/graphql")
        .send({
          query:
            'mutation{addExperience(input: {title: "test title", body: "test body", username: "user_a", location_lat: "53.96268", location_long: "-1.085605"}) {experience_id title body username created_at location_lat location_long likes}}',
        })
        .expect(200)
        .then(({ body: { data } }) => {
          const experience = data.addExperience;
          expect(experience).toEqual(
            expect.objectContaining({
              experience_id: expect.any(String),
              title: "test title",
              body: "test body",
              username: "user_a",
              created_at: expect.any(String),
              location_lat: "53.96268",
              location_long: "-1.085605",
              likes: 0,
            })
          );
        });
    });
  });
});
