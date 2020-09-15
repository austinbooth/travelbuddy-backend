const {
  formatDates,
  makeRefObj,
  formatComments,
  formatsExperiences,
} = require("../db/utils/utils");

describe("formatDates", () => {
  test("returns a new array and object", () => {
    const created_at = 0;
    const input = [];
    const inputObj = { created_at };

    const output = formatDates(input);
    expect(output).not.toBe(input);
    expect(output[0]).not.toBe(inputObj);
  });
  test("works for a single object", () => {
    const created_at = 0;
    const input = [];
    const inputObj = { created_at };
    input[0] = inputObj;

    const expectedOutput = [{ created_at: new Date(created_at) }];
    const output = formatDates(input);
    expect(output).toEqual(expectedOutput);
  });
  test("works for multiple objects", () => {
    const created_at0 = 86400000000;
    const created_at1 = 1600094700000;
    const input = [{ created_at: created_at0 }, { created_at: created_at1 }];
    const expectedDate0 = new Date(created_at0);
    const expectedDate1 = new Date(created_at1);
    const output = formatDates(input);

    expect(output.length).toBe(2);
    expect(output[0].created_at).toEqual(expectedDate0);
    expect(output[1].created_at).toEqual(expectedDate1);
  });
  test("keeps all other object properties", () => {
    const created_at = 946684800000;
    const input = [
      {
        title: "experience title",
        body: "experience body",
        likes: 5,
        created_at,
      },
    ];
    const expectedOutput = [
      {
        title: "experience title",
        body: "experience body",
        likes: 5,
        created_at: new Date(created_at),
      },
    ];
    const output = formatDates(input);
    expect(output).toEqual(expectedOutput);
  });
});

describe("makeRefObj", () => {
  test("returns an empty object when passed an empty array", () => {
    expect(makeRefObj([])).toEqual({});
  });
  test("works for an array with 1 article object", () => {
    const input = [
      {
        experience_id: 2,
        title: "experience 2",
        body: "body for experience 2",
        username: "user_b",
        created_at: 1564856463,
        location_lat: 53.959974,
        location_long: -1.08025,
        likes: 10,
        belongs_to_tag_text: "tag_2",
      },
    ];
    const expectedOutput = {
      "experience 2": 2,
    };
    expect(makeRefObj(input, "title", "experience_id")).toEqual(expectedOutput);
  });
  test("works for multiple objects", () => {
    const input = [
      {
        experience_id: 2,
        title: "experience 2",
        body: "body for experience 2",
        username: "user_b",
        created_at: 1564856463,
        location_lat: 53.959974,
        location_long: -1.08025,
        likes: 10,
        belongs_to_tag_text: "tag_2",
      },
      {
        experience_id: 5,
        title: "experience 5",
        body: "body for experience 5",
        username: "user_b",
        created_at: 1584856563,
        location_lat: 53.958061,
        location_long: -1.092227,
        likes: 20,
        belongs_to_tag_text: "tag_5",
      },
      {
        experience_id: 10,
        title: "experience 8",
        body: "body for experience 10",
        username: "user_b",
        created_at: 1584856563,
        location_lat: 53.958061,
        location_long: -1.092227,
        likes: 15,
        belongs_to_tag_text: "tag_3",
      },
    ];
    const expectedOutput = {
      "experience 2": 2,
      "experience 5": 5,
      "experience 8": 10,
    };
    expect(makeRefObj(input, "title", "experience_id")).toEqual(expectedOutput);
  });
});

describe("formatComments", () => {
  test("works for a single comment, and does not mutate the original comment", () => {
    const experiences = [
      {
        experience_id: 2,
        title: "experience 2",
        body: "body for experience 2",
        username: "user_a",
        created_at: 1564856463,
        location_lat: 53.959974,
        location_long: -1.08025,
        likes: 10,
      },
      {
        experience_id: 5,
        title: "experience 5",
        body: "body for experience 5",
        username: "user_b",
        created_at: 1584856563,
        location_lat: 53.958061,
        location_long: -1.092227,
        likes: 20,
      },
      {
        experience_id: 10,
        title: "experience 8",
        body: "body for experience 10",
        username: "user_c",
        created_at: 1584856563,
        location_lat: 53.958061,
        location_long: -1.092227,
        likes: 15,
      },
    ];
    comment = [
      {
        comment_id: 1,
        created_at: 1586549847000,
        body: "body for comment 1 for experience 2",
        likes: "1",
        username: "user_b",
        belongs_to_title: "experience 2",
      },
    ];

    const experienceRefObj = makeRefObj(experiences, "title", "experience_id");
    const expectedCreatedAt = new Date(comment[0].created_at);
    const expectedOutput = [
      {
        comment_id: 1,
        created_at: expectedCreatedAt,
        body: "body for comment 1 for experience 2",
        likes: "1",
        username: "user_b",
        experience_id: 2,
      },
    ];
    const output = formatComments(comment, experienceRefObj);
    expect(Array.isArray(output)).toBe(true);
    expect(output).toEqual(expectedOutput);
    expect(output).not.toBe(expectedOutput);
    expect(comment).toEqual([
      {
        comment_id: 1,
        created_at: 1586549847000,
        body: "body for comment 1 for experience 2",
        likes: "1",
        username: "user_b",
        belongs_to_title: "experience 2",
      },
    ]);
  });
});

describe("formatsExperiences", () => {
  test("works for a single experience, and does not mutate the original experience", () => {
    const experience = [
      {
        experience_id: 2,
        title: "experience 2",
        body: "body for experience 2",
        username: "user_a",
        created_at: 1564856463,
        location_lat: 53.959974,
        location_long: -1.08025,
        likes: 10,
        belongs_to_tag_text: "tag_1",
      },
    ];
    const tags = [
      { tag_id: 1, tag_text: "tag_1" },
      { tag_id: 2, tag_text: "tag_2" },
      { tag_id: 3, tag_text: "tag_3" },
      { tag_id: 4, tag_text: "tag_4" },
      { tag_id: 5, tag_text: "tag_5" },
    ];
    const tagsRefObj = makeRefObj(tags, "tag_text", "tag_id");
    const expectedCreatedAt = new Date(experience[0].created_at);
    const expectedOutput = [
      {
        experience_id: 2,
        title: "experience 2",
        body: "body for experience 2",
        username: "user_a",
        created_at: expectedCreatedAt,
        location_lat: 53.959974,
        location_long: -1.08025,
        likes: 10,
      },
    ];
    const output = formatsExperiences(experience, tagsRefObj);
    expect(Array.isArray(output)).toBe(true);
    expect(output).toEqual(expectedOutput);
    expect(output).not.toBe(expectedOutput);
    expect(experience).toEqual([
      {
        experience_id: 2,
        title: "experience 2",
        body: "body for experience 2",
        username: "user_a",
        created_at: 1564856463,
        location_lat: 53.959974,
        location_long: -1.08025,
        likes: 10,
        belongs_to_tag_text: "tag_1",
      },
    ]);
  });
});
