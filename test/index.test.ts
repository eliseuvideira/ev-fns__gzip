import { identity } from "../src/index";

describe("identity", () => {
  const cases = [
    true,
    false,
    0,
    1,
    Math.random(),
    "",
    Date.now().toString(),
    new Date(),
    [],
    {},
  ];

  it("is an identity function", () => {
    expect.assertions(cases.length);

    cases.forEach((value) => expect(identity(value)).toEqual(value));
  });
});
