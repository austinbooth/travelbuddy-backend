process.env.NODE_ENV = "test";

const app = require("../app");
const request = require("supertest");
const db = require("../db/connection");

beforeEach(() => db.seed.run());

describe("app", () => {
  afterAll(() => connection.destroy());
  describe("/graphql", () => {
    test("POST: 200 - adds a new experience", () => {
      const mutation = {
        query:
          'mutation{addExperience(input: {title: "test title", body: "test body", username: "user_a", location_lat: "53.96268", location_long: "-1.085605"}) {experience_id title body username created_at location_lat location_long likes}}',
      };
      return request(app)
        .post("/graphql")
        .send(mutation)
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
    test("POST: 200 - adds a comment to an experience", () => {
      const mutation = {
        query:
          'mutation{addComment(input: {experience_id:"4", body:"test comment body", username:"user_b"}) {comment_id body username created_at likes}}',
      };
      return request(app)
        .post("/graphql")
        .send(mutation)
        .expect(200)
        .then(({ body: { data } }) => {
          const comment = data.addComment;
          expect(comment).toEqual(
            expect.objectContaining({
              comment_id: expect.any(String),
              body: "test comment body",
              username: "user_b",
              created_at: expect.any(String),
              likes: 0,
            })
          );
        });
    });
    test("POST: 200 - adds an image to an experience", () => {
      const mutation = {
        query:
          'mutation{addImage(input:{experience_id:"1", image_desc:"test image desc", image_URL:"https://test-url.com"}){image_id image_desc image_URL experience_id}}',
      };
      return request(app)
        .post("/graphql")
        .send(mutation)
        .expect(200)
        .then(({ body: { data } }) => {
          const image = data.addImage;
          expect(image).toEqual(
            expect.objectContaining({
              image_id: expect.any(String),
              image_desc: "test image desc",
              image_URL: "https://test-url.com",
              experience_id: expect.any(String),
            })
          );
        });
    });
  });
});
