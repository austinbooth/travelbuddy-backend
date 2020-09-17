const app = require("../app");
const request = require("supertest");

describe("app", () => {
  describe("/graphql", () => {
    describe("/graphql", () => {
      test("POST: 200 - responds with JSON for all experiences", () => {
        const query = {
          query: "{experiences {title}}"
        };
        return request(app)
          .post("/graphql")
          .send(query)
          .expect(200)
          .then(({
            body: {
              data
            }
          }) => {
            expect(Array.isArray(data.experiences)).toBe(true);
            expect(data.experiences.length).toBe(5);

          });
      });
      test("POST: 200 - responds with JSON containing all key value pairs when passed all keys", () => {
        const query = {
          query: "{experiences { experience_id,title,  body, username, created_at,location_lat,  location_long,likes }}"
        };
        return request(app)
          .post("/graphql")
          .send(query)
          .expect(200)
          .then(({
            body: {
              data
            }
          }) => {
            expect(data.experiences[0]).toEqual(
              expect.objectContaining({
                title: "experience 1",
                body: "body for experience 1",
                username: "user_a",
                created_at: "1584549747000",
                experience_id: "1",
                location_lat: "53.955609",
                location_long: "-1.078392",
                likes: 5,

              })
            );

          });
      });
    });
  })
});