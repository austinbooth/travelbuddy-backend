const { formatDates } = require("../db/utils/utils");

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
    console.log(expectedDate0, expectedDate1, Date.now());
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
