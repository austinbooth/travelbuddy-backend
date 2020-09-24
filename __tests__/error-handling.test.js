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
      test("POST: 200 - returns an appropriate error message when passed a malformed query", () => {
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
    describe("images", () => {
      test("POST: 200 - returns an appropriate error message when passed a valid but non-existent experience_id", () => {
        const query = {
          query: '{images(experience_id: "999") {image_desc}}',
        };
        return request(app)
          .post("/graphql")
          .send(query)
          .expect(200)
          .then(({ body: { data, errors } }) => {
            expect(data.images).toBe(null);
            expect(errors[0].msg).toBe(
              "images not found, invalid experience id"
            );
          });
      });
      test("POST: 200 - returns an appropriate error message when passed an invalid experience_id", () => {
        const query = {
          query: '{images(experience_id: "beef") {image_desc}}',
        };
        return request(app)
          .post("/graphql")
          .send(query)
          .expect(200)
          .then(({ body: { data, errors } }) => {
            expect(data.images).toBe(null);
            expect(errors[0].msg).toBe(
              "images not found, invalid experience id"
            );
          });
      });
      test("POST: 200 - returns an appropriate error message when passed a malformed query", () => {
        const query = {
          query: '{images(experience_iddd: "1") {image_desc}}',
        };
        return request(app)
          .post("/graphql")
          .send(query)
          .expect(400)
          .then(({ body: { data, errors } }) => {
            expect(errors[0].msg).toBe(
              "unable to find images, please check input"
            );
          });
      });
    });
    describe("tagsForAnExperience", () => {
      test("POST: 200 - returns an appropriate error message when passed a valid but non-existent experience_id", () => {
        const query = {
          query: '{tagsForAnExperience(experience_id: "999") {tag_text}}',
        };
        return request(app)
          .post("/graphql")
          .send(query)
          .expect(200)
          .then(({ body: { data, errors } }) => {
            expect(data.tagsForAnExperience).toBe(null);
            expect(errors[0].msg).toBe("tags not found, invalid experience id");
          });
      });
      test("POST: 200 - returns an appropriate error message when passed an invalid experience_id", () => {
        const query = {
          query: '{tagsForAnExperience(experience_id: "beef") {tag_text}}',
        };
        return request(app)
          .post("/graphql")
          .send(query)
          .expect(200)
          .then(({ body: { data, errors } }) => {
            expect(data.tagsForAnExperience).toBe(null);
            expect(errors[0].msg).toBe("tags not found, invalid experience id");
          });
      });
      test("POST: 200 - returns an appropriate error message when passed a malformed query", () => {
        const query = {
          query: '{tagsForAnExperience(experience_idddd: "1") {tag_text}}',
        };
        return request(app)
          .post("/graphql")
          .send(query)
          .expect(400)
          .then(({ body: { data, errors } }) => {
            expect(errors[0].msg).toBe(
              "unable to find tags, please check input"
            );
          });
      });
    });
    describe("experiencesForATag", () => {
      test("POST: 200 - returns an appropriate error message when passed a valid but non-existent experience_id", () => {
        const query = {
          query: '{experiencesForATag(tag_id: "999") {experience_id}}',
        };
        return request(app)
          .post("/graphql")
          .send(query)
          .expect(200)
          .then(({ body: { data, errors } }) => {
            expect(data.experiencesForATag).toBe(null);
            expect(errors[0].msg).toBe("experiences not found, invalid tag id");
          });
      });
      test("POST: 200 - returns an appropriate error message when passed an invalid experience_id", () => {
        const query = {
          query: '{experiencesForATag(tag_id: "beef") {experience_id}}',
        };
        return request(app)
          .post("/graphql")
          .send(query)
          .expect(200)
          .then(({ body: { data, errors } }) => {
            expect(data.experiencesForATag).toBe(null);
            expect(errors[0].msg).toBe("experiences not found, invalid tag id");
          });
      });
      test("POST: 200 - returns an appropriate error message when passed a malformed query", () => {
        const query = {
          query: '{experiencesForATag(experience_idddd: "1") {experience_id}}',
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
    describe("Mutation - addExperience", () => {
      test("POST: 200 - returns an appropriate error message when passed a malformed query", () => {
        const mutation = {
          query:
            'mutation{addExperience(input: {titleeee: "test title", body: "test body", username: "user_a", location_lat: "53.96268", location_long: "-1.085605"}) {experience_id title body username created_at location_lat location_long likes}}',
        };
        return request(app)
          .post("/graphql")
          .send(mutation)
          .expect(400)
          .then(({ body: { data, errors } }) => {
            expect(errors[0].msg).toBe(
              "unable to add experience, please check input"
            );
          });
      });
    });
    describe("Mutation - addComment", () => {
      test("POST: 200 - returns an appropriate error message when passed a malformed query", () => {
        const mutation = {
          query:
            'mutation{addComment(input: {experience_iddd:"4", body:"test comment body", username:"user_b"}) {comment_id body username created_at likes}}',
        };
        return request(app)
          .post("/graphql")
          .send(mutation)
          .expect(400)
          .then(({ body: { data, errors } }) => {
            expect(errors[0].msg).toBe(
              "unable to add comment, please check input"
            );
          });
      });
    });
    describe("Mutation - addImage", () => {
      test("POST: 200 - returns an appropriate error message when passed a malformed query", () => {
        const mutation = {
          query:
            'mutation{addImage(input:{experience_iddd:"1", image_desc:"test image desc", image_URL:"https://test-url.com"}){image_id image_desc image_URL experience_id}}',
        };
        return request(app)
          .post("/graphql")
          .send(mutation)
          .expect(400)
          .then(({ body: { data, errors } }) => {
            expect(errors[0].msg).toBe(
              "unable to add image, please check input"
            );
          });
      });
    });
    describe("Mutation - updateExperience", () => {
      test("POST: 200 - returns an appropriate error message when passed a valid but non-existent experience_id", () => {
        const mutation = {
          query:
            'mutation{updateExperience(input:{experience_id: "999", title: "new title", body: "new body"}){experience_id title body username created_at location_lat location_long likes}}',
        };
        return request(app)
          .post("/graphql")
          .send(mutation)
          .expect(200)
          .then(({ body: { data, errors } }) => {
            expect(data.updateExperience).toBe(null);
            expect(errors[0].msg).toBe(
              "unable to update experience, invalid experience id or empty field"
            );
          });
      });
      test("POST: 200 - returns an appropriate error message when passed an invalid experience_id", () => {
        const mutation = {
          query:
            'mutation{updateExperience(input:{experience_id: "beef", title: "new title", body: "new body"}){experience_id title body username created_at location_lat location_long likes}}',
        };
        return request(app)
          .post("/graphql")
          .send(mutation)
          .expect(200)
          .then(({ body: { data, errors } }) => {
            expect(data.updateExperience).toBe(null);
            expect(errors[0].msg).toBe(
              "unable to update experience, invalid experience id or empty field"
            );
          });
      });
      test("POST: 200 - returns an appropriate error message when passed a malformed query", () => {
        const mutation = {
          query:
            'mutation{updateExperience(input:{experience_iddd: "1", title: "new title", body: "new body"}){experience_id title body username created_at location_lat location_long likes}}',
        };
        return request(app)
          .post("/graphql")
          .send(mutation)
          .expect(400)
          .then(({ body: { data, errors } }) => {
            expect(errors[0].msg).toBe(
              "unable to update experience, please check input"
            );
          });
      });
    });
    describe("Mutation - updateExperienceLikes", () => {
      test("POST: 200 - returns an appropriate error message when passed a valid but non-existent experience_id", () => {
        const mutation = {
          query:
            'mutation{updateExperienceLikes(input:{experience_id: "999", inc_likes: 1}){experience_id title body username created_at location_lat location_long likes}}',
        };
        return request(app)
          .post("/graphql")
          .send(mutation)
          .expect(200)
          .then(({ body: { data, errors } }) => {
            expect(data.updateExperienceLikes).toBe(null);
            expect(errors[0].msg).toBe(
              "unable to update experience likes, invalid experience id or empty field"
            );
          });
      });
      test("POST: 200 - returns an appropriate error message when passed an invalid experience_id", () => {
        const mutation = {
          query:
            'mutation{updateExperienceLikes(input:{experience_id: "beef", inc_likes: 1}){experience_id title body username created_at location_lat location_long likes}}',
        };
        return request(app)
          .post("/graphql")
          .send(mutation)
          .expect(200)
          .then(({ body: { data, errors } }) => {
            expect(data.updateExperienceLikes).toBe(null);
            expect(errors[0].msg).toBe(
              "unable to update experience likes, invalid experience id or empty field"
            );
          });
      });
      test("POST: 200 - returns an appropriate error message when passed a malformed query", () => {
        const mutation = {
          query:
            'mutation{updateExperienceLikes(input:{experience_iddd: "1", inc_likes: 1}){experience_id title body username created_at location_lat location_long likes}}',
        };
        return request(app)
          .post("/graphql")
          .send(mutation)
          .expect(400)
          .then(({ body: { data, errors } }) => {
            expect(errors[0].msg).toBe(
              "unable to update experience likes, please check input"
            );
          });
      });
    });
    describe("Mutation - deleteComment", () => {
      test("POST: 200 - returns an appropriate error message when passed a valid but non-existent experience_id", () => {
        const mutation = {
          query:
            'mutation{deleteComment(input:{comment_id:"999"}){ comment_id }}',
        };
        return request(app)
          .post("/graphql")
          .send(mutation)
          .expect(200)
          .then(({ body: { data, errors } }) => {
            expect(data.deleteComment).toBe(null);
            expect(errors[0].msg).toBe(
              "unable to delete comment, invalid comment id"
            );
          });
      });
      test("POST: 200 - returns an appropriate error message when passed an invalid experience_id", () => {
        const mutation = {
          query:
            'mutation{deleteComment(input:{comment_id:"beef"}){ comment_id }}',
        };
        return request(app)
          .post("/graphql")
          .send(mutation)
          .expect(200)
          .then(({ body: { data, errors } }) => {
            expect(data.deleteComment).toBe(null);
            expect(errors[0].msg).toBe(
              "unable to delete comment, invalid comment id"
            );
          });
      });
      test("POST: 200 - returns an appropriate error message when passed a malformed query", () => {
        const mutation = {
          query:
            'mutation{deleteComment(input:{comment_iddd:"3"}){ comment_id }}',
        };
        return request(app)
          .post("/graphql")
          .send(mutation)
          .expect(400)
          .then(({ body: { data, errors } }) => {
            expect(errors[0].msg).toBe(
              "unable to delete comment, please check input"
            );
          });
      });
    });
    describe("Mutation - deleteImage", () => {
      test("POST: 200 - returns an appropriate error message when passed a valid but non-existent experience_id", () => {
        const mutation = {
          query: 'mutation{deleteImage(input: {image_id:"999"}){ image_id }}',
        };
        return request(app)
          .post("/graphql")
          .send(mutation)
          .expect(200)
          .then(({ body: { data, errors } }) => {
            expect(data.deleteImage).toBe(null);
            expect(errors[0].msg).toBe(
              "unable to delete image, invalid image id"
            );
          });
      });
      test("POST: 200 - returns an appropriate error message when passed an invalid experience_id", () => {
        const mutation = {
          query: 'mutation{deleteImage(input: {image_id:"beef"}){ image_id }}',
        };
        return request(app)
          .post("/graphql")
          .send(mutation)
          .expect(200)
          .then(({ body: { data, errors } }) => {
            expect(data.deleteImage).toBe(null);
            expect(errors[0].msg).toBe(
              "unable to delete image, invalid image id"
            );
          });
      });
      test("POST: 200 - returns an appropriate error message when passed a malformed query", () => {
        const mutation = {
          query: 'mutation{deleteImage(input: {image_iddd:"1"}){ image_id }}',
        };
        return request(app)
          .post("/graphql")
          .send(mutation)
          .expect(400)
          .then(({ body: { data, errors } }) => {
            expect(errors[0].msg).toBe(
              "unable to delete image, please check input"
            );
          });
      });
    });
    describe("Mutation - deleteExperience", () => {
      test("POST: 200 - returns an appropriate error message when passed a valid but non-existent experience_id", () => {
        const mutation = {
          query:
            'mutation{deleteExperience(input:{experience_id:"999"}){ experience_id }}',
        };
        return request(app)
          .post("/graphql")
          .send(mutation)
          .expect(200)
          .then(({ body: { data, errors } }) => {
            expect(data.deleteExperience).toBe(null);
            expect(errors[0].msg).toBe(
              "unable to delete experience, invalid experience id"
            );
          });
      });
      test("POST: 200 - returns an appropriate error message when passed an invalid experience_id", () => {
        const mutation = {
          query:
            'mutation{deleteExperience(input:{experience_id:"beef"}){ experience_id }}',
        };
        return request(app)
          .post("/graphql")
          .send(mutation)
          .expect(200)
          .then(({ body: { data, errors } }) => {
            expect(data.deleteExperience).toBe(null);
            expect(errors[0].msg).toBe(
              "unable to delete experience, invalid experience id"
            );
          });
      });
      test("POST: 200 - returns an appropriate error message when passed a malformed query", () => {
        const mutation = {
          query:
            'mutation{deleteExperience(input:{experience_iddd:"1"}){ experience_id }}',
        };
        return request(app)
          .post("/graphql")
          .send(mutation)
          .expect(400)
          .then(({ body: { data, errors } }) => {
            expect(errors[0].msg).toBe(
              "unable to delete experience, please check input"
            );
          });
      });
    });
    describe("Mutation - deleteTagFromExperience", () => {
      test("POST: 200 - returns an appropriate error message when passed a valid but non-existent experience_id", () => {
        const mutation = {
          query:
            'mutation{deleteTagFromExperience(input:{experience_id:"999", tag_id:"2"}){ experience_id, tag_id }}',
        };
        return request(app)
          .post("/graphql")
          .send(mutation)
          .expect(200)
          .then(({ body: { data, errors } }) => {
            expect(data.deleteTagFromExperience).toBe(null);
            expect(errors[0].msg).toBe(
              "unable to delete tag from experience, invalid experience id or tag_id"
            );
          });
      });
      test("POST: 200 - returns an appropriate error message when passed an invalid experience_id", () => {
        const mutation = {
          query:
            'mutation{deleteTagFromExperience(input:{experience_id:"beef", tag_id:"2"}){ experience_id, tag_id }}',
        };
        return request(app)
          .post("/graphql")
          .send(mutation)
          .expect(200)
          .then(({ body: { data, errors } }) => {
            expect(data.deleteTagFromExperience).toBe(null);
            expect(errors[0].msg).toBe(
              "unable to delete tag from experience, invalid experience id or tag_id"
            );
          });
      });
      test("POST: 200 - returns an appropriate error message when passed a malformed query", () => {
        const mutation = {
          query:
            'mutation{deleteTagFromExperience(input:{experience_iddd:"2", tag_id:"2"}){ experience_id, tag_id }}',
        };
        return request(app)
          .post("/graphql")
          .send(mutation)
          .expect(400)
          .then(({ body: { data, errors } }) => {
            expect(errors[0].msg).toBe(
              "unable to delete tag from experience, please check input"
            );
          });
      });
    });
    describe("Mutation - updateCommentLikes", () => {
      test("POST: 200 - returns an appropriate error message when passed a valid but non-existent experience_id", () => {
        const mutation = {
          query:
            'mutation{updateCommentLikes(input:{comment_id: "999", inc_likes: 1}){comment_id created_at body likes username experience_id }}',
        };
        return request(app)
          .post("/graphql")
          .send(mutation)
          .expect(200)
          .then(({ body: { data, errors } }) => {
            expect(data.updateCommentLikes).toBe(null);
            expect(errors[0].msg).toBe(
              "unable to update comment likes, invalid comment id"
            );
          });
      });
      test("POST: 200 - returns an appropriate error message when passed an invalid experience_id", () => {
        const mutation = {
          query:
            'mutation{updateCommentLikes(input:{comment_id: "beef", inc_likes: 1}){comment_id created_at body likes username experience_id }}',
        };
        return request(app)
          .post("/graphql")
          .send(mutation)
          .expect(200)
          .then(({ body: { data, errors } }) => {
            expect(data.updateCommentLikes).toBe(null);
            expect(errors[0].msg).toBe(
              "unable to update comment likes, invalid comment id"
            );
          });
      });
      test("POST: 200 - returns an appropriate error message when passed a malformed query", () => {
        const mutation = {
          query:
            'mutation{updateCommentLikes(input:{comment_iddd: "2", inc_likes: 1}){comment_id created_at body likes username experience_id }}',
        };
        return request(app)
          .post("/graphql")
          .send(mutation)
          .expect(400)
          .then(({ body: { data, errors } }) => {
            expect(errors[0].msg).toBe(
              "unable to update comment likes, please check input"
            );
          });
      });
    });
    describe("Mutation - addTagToExperience", () => {
      test("POST: 200 - returns an appropriate error message when passed a valid but non-existent experience_id", () => {
        const mutation = {
          query:
            'mutation{addTagToExperience(input:{experience_id: "999", tag_id: 1}){experience_id, tag_id }}',
        };
        return request(app)
          .post("/graphql")
          .send(mutation)
          .expect(200)
          .then(({ body: { data, errors } }) => {
            expect(data.addTagToExperience).toBe(null);
            expect(errors[0].msg).toBe(
              "unable to add tag to experience, invalid tag id or experience id"
            );
          });
      });
      test("POST: 200 - returns an appropriate error message when passed an invalid experience_id", () => {
        const mutation = {
          query:
            'mutation{addTagToExperience(input:{experience_id: "beef", tag_id: 1}){experience_id, tag_id }}',
        };
        return request(app)
          .post("/graphql")
          .send(mutation)
          .expect(200)
          .then(({ body: { data, errors } }) => {
            expect(data.addTagToExperience).toBe(null);
            expect(errors[0].msg).toBe(
              "unable to add tag to experience, invalid tag id or experience id"
            );
          });
      });
      test("POST: 200 - returns an appropriate error message when passed a malformed query", () => {
        const mutation = {
          query:
            'mutation{addTagToExperience(input:{experience_iddd: "999", tag_id: 1}){experience_id, tag_id }}',
        };
        return request(app)
          .post("/graphql")
          .send(mutation)
          .expect(400)
          .then(({ body: { data, errors } }) => {
            expect(errors[0].msg).toBe(
              "unable to add tag to experience, please check input"
            );
          });
      });
    });
  });
});
