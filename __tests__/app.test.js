process.env.NODE_ENV = "test";

const app = require("../app");
const request = require("supertest");
const db = require("../db/connection");

describe("app", () => {
  beforeEach(() => db.seed.run());
  afterAll(() => db.destroy());
  describe("/graphql", () => {
    describe("experiences", () => {
      test("POST: 200 - responds with JSON for all experiences", () => {
        const query = {
          query: "{experiences {title}}",
        };
        return request(app)
          .post("/graphql")
          .send(query)
          .expect(200)
          .then(({ body: { data } }) => {
            expect(Array.isArray(data.experiences)).toBe(true);
            expect(data.experiences.length).toBe(5);
          });
      });
      test("POST: 200 - responds with JSON containing all key value pairs when passed all keys", () => {
        const query = {
          query:
            "{experiences { experience_id,title,  body, username, created_at,location_lat,  location_long,likes }}",
        };
        return request(app)
          .post("/graphql")
          .send(query)
          .expect(200)
          .then(({ body: { data } }) => {
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
      test("POST: 200 - updates title and body on an experience", () => {
        const mutation = {
          query:
            'mutation{updateExperience(input:{experience_id: "1", title: "new title", body: "new body"}){experience_id title body username created_at location_lat location_long likes}}',
        };
        return request(app)
          .post("/graphql")
          .send(mutation)
          .expect(200)
          .then(({ body: { data } }) => {
            const updatedExperience = data.updateExperience;
            expect(updatedExperience).toEqual(
              expect.objectContaining({
                title: "new title",
                body: "new body",
              })
            );
          });
      });
      test("POST: 200 - updates likes on an experience for a positive value", () => {
        const mutation = {
          query:
            'mutation{updateExperienceLikes(input:{experience_id: "1", inc_likes: 1}){experience_id title body username created_at location_lat location_long likes}}',
        };
        return request(app)
          .post("/graphql")
          .send(mutation)
          .expect(200)
          .then(({ body: { data } }) => {
            const updatedLikes = data.updateExperienceLikes;
            expect(updatedLikes).toEqual(
              expect.objectContaining({
                likes: 6,
              })
            );
          });
      });
      test("POST: 200 - updates likes on an experience for a negative value", () => {
        const mutation = {
          query:
            'mutation{updateExperienceLikes(input:{experience_id: "1", inc_likes: -1}){experience_id title body username created_at location_lat location_long likes}}',
        };
        return request(app)
          .post("/graphql")
          .send(mutation)
          .expect(200)
          .then(({ body: { data } }) => {
            const updatedLikes = data.updateExperienceLikes;
            expect(updatedLikes).toEqual(
              expect.objectContaining({
                likes: 4,
              })
            );
          });
      });
    });
    describe("comments", () => {
      test("POST: 200 - responds with JSON for all associated comments when passed an experience id", () => {
        const query = {
          query: "{comments(experience_id: 1) {body}}",
        };
        return request(app)
          .post("/graphql")
          .send(query)
          .expect(200)
          .then(({ body: { data } }) => {
            expect(Array.isArray(data.comments)).toBe(true);
            expect(data.comments.length).toBe(2);
          });
      });
      test("POST: 200 - responds with JSON containing all key value pairs when passed all keys", () => {
        const query = {
          query:
            "{comments(experience_id: 1) {  comment_id, created_at,  body,  likes,   username, experience_id}}",
        };
        return request(app)
          .post("/graphql")
          .send(query)
          .expect(200)
          .then(({ body: { data } }) => {
            expect(data.comments[0]).toEqual(
              expect.objectContaining(
                {
                  body: "body for comment 1 for experience 1",
                  comment_id: "1",
                  created_at: "1586549847000",
                  experience_id: "1",
                  likes: 1,
                  username: "user_b",
                },
                {
                  body: "body for comment 2 for experience 1",
                  comment_id: "2",
                  created_at: "1594549847000",
                  experience_id: "1",
                  likes: 5,
                  username: "user_c",
                }
              )
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
      test("POST: 200 - updates likes on a comment for a positive value", () => {
        const mutation = {
          query:
            'mutation{updateCommentLikes(input:{comment_id: "2", inc_likes: 1}){comment_id created_at body likes username experience_id }}',
        };
        return request(app)
          .post("/graphql")
          .send(mutation)
          .expect(200)
          .then(({ body: { data } }) => {
            const updatedLikes = data.updateCommentLikes;
            expect(updatedLikes).toEqual(
              expect.objectContaining({
                likes: 6,
              })
            );
          });
      });
      test("POST: 200 - updates likes on a comment for a negative value", () => {
        const mutation = {
          query:
            'mutation{updateCommentLikes(input:{comment_id: "2", inc_likes: -1}){comment_id created_at body likes username experience_id }}',
        };
        return request(app)
          .post("/graphql")
          .send(mutation)
          .expect(200)
          .then(({ body: { data } }) => {
            const updatedLikes = data.updateCommentLikes;
            expect(updatedLikes).toEqual(
              expect.objectContaining({
                likes: 4,
              })
            );
          });
      });
    });
    describe("images", () => {
      test("POST: 200 - responds with JSON for all associated images when passed an experience id", () => {
        const query = {
          query: "{images(experience_id: 1) {image_desc}}",
        };
        return request(app)
          .post("/graphql")
          .send(query)
          .expect(200)
          .then(({ body: { data } }) => {
            expect(Array.isArray(data.images)).toBe(true);
            expect(data.images.length).toBe(1);
          });
      });
      test("POST: 200 - responds with JSON containing all key value pairs when passed all keys", () => {
        const query = {
          query:
            "{images(experience_id: 1) { image_id, experience_id, image_desc, image_URL,}}",
        };
        return request(app)
          .post("/graphql")
          .send(query)
          .expect(200)
          .then(({ body: { data } }) => {
            expect(data.images[0]).toEqual(
              expect.objectContaining({
                image_id: "1",
                experience_id: "1",
                image_desc: "image 1 for experience 1",
                image_URL: "",
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
    describe("tags", () => {
      test("POST: 200 - responds with JSON for all associated tags when passed an experience id", () => {
        const query = {
          query: "{tagsForAnExperience(experience_id: 1) {tag_text}}",
        };
        return request(app)
          .post("/graphql")
          .send(query)
          .expect(200)
          .then(({ body: { data } }) => {
            expect(Array.isArray(data.tagsForAnExperience)).toBe(true);
            expect(data.tagsForAnExperience.length).toBe(1);
          });
      });
      test("POST: 200 - responds with JSON containing all key value pairs when passed all keys", () => {
        const query = {
          query:
            "{tagsForAnExperience(experience_id: 1) {  tag_id, tag_text, experience_id}}",
        };
        return request(app)
          .post("/graphql")
          .send(query)
          .expect(200)
          .then(({ body: { data } }) => {
            expect(data.tagsForAnExperience[0]).toEqual(
              expect.objectContaining({
                experience_id: "1",
                tag_id: "1",
                tag_text: "tag_1",
              })
            );
          });
      });
    });
    describe("deleteComment", () => {
      test("deletes a comment and returns the id of the deleted comment", () => {
        const mutation = {
          query:
            'mutation{deleteComment(input:{comment_id:"3"}){ comment_id }}',
        };
        return request(app)
          .post("/graphql")
          .send(mutation)
          .expect(200)
          .then(
            ({
              body: {
                data: { deleteComment },
              },
            }) => {
              expect(deleteComment.comment_id).toBe("3");
            }
          )
          .then(() => {
            const query = {
              query: "{comments(experience_id: 2) {body}}",
            };
            return request(app).post("/graphql").send(query);
          })
          .then(
            ({
              body: {
                data: { comments },
              },
            }) => {
              expect(comments.length).toBe(0);
            }
          );
      });
    });
    describe("deleteImage", () => {
      test("deletes an image and returns the id of the deleted image", () => {
        const mutation = {
          query: 'mutation{deleteImage(input: {image_id:"1"}){ image_id }}',
        };
        return request(app)
          .post("/graphql")
          .send(mutation)
          .expect(200)
          .then(
            ({
              body: {
                data: { deleteImage },
              },
            }) => {
              expect(deleteImage.image_id).toBe("1");
            }
          )
          .then(() => {
            const query = {
              query: '{images(experience_id: "1") {image_id}}',
            };
            return request(app).post("/graphql").send(query);
          })
          .then(
            ({
              body: {
                data: { images },
              },
            }) => {
              expect(images.length).toBe(0);
            }
          );
      });
    });
    describe("deleteExperience", () => {
      test("deletes an experience and returns the id of the deleted experience", () => {
        const mutation = {
          query:
            'mutation{deleteExperience(input:{experience_id:"1"}){ experience_id }}',
        };
        return request(app)
          .post("/graphql")
          .send(mutation)
          .expect(200)
          .then(
            ({
              body: {
                data: { deleteExperience },
              },
            }) => {
              expect(deleteExperience.experience_id).toBe("1");
            }
          )
          .then(() => {
            const query = {
              query: '{experience(experience_id: "1") {experience_id}}',
            };
            return request(app).post("/graphql").send(query);
          })
          .then(({ body: { errors } }) => {
            expect(errors[0].msg).toBe(
              "experience not found, invalid experience id"
            );
          });
      });
    });
    describe("deleteTagFromExperience", () => {
      test("deletes a tag from an experience and returns the experience id and tag id", () => {
        const mutation = {
          query:
            'mutation{deleteTagFromExperience(input:{experience_id:"2", tag_id:"2"}){ experience_id, tag_id }}',
        };
        return request(app)
          .post("/graphql")
          .send(mutation)
          .expect(200)
          .then(
            ({
              body: {
                data: { deleteTagFromExperience },
              },
            }) => {
              expect(deleteTagFromExperience.experience_id).toBe("2");
              expect(deleteTagFromExperience.tag_id).toBe("2");
            }
          )
          .then(() => {
            const query = {
              query: '{tagsForAnExperience(experience_id: "2") {tag_id}}',
            };
            return request(app).post("/graphql").send(query);
          })
          .then(
            ({
              body: {
                data: { tagsForAnExperience },
              },
            }) => {
              expect(tagsForAnExperience.length).toBe(0);
            }
          );
      });
    });
  });
});
