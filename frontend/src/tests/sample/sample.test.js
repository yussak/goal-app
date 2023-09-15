const sum = require("./sum");

test("adds 1+2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

test("adds 1+2 not to equal 6", () => {
  expect(sum(1, 2)).not.toBe(6);
});

test("object assignment", () => {
  const data = { one: 1 };
  data["two"] = 2;
  expect(data).toEqual({ one: 1, two: 2 });
});

test("2+2", () => {
  const value = 2 + 2;
  expect(value).toBeGreaterThan(3);
  expect(value).toBeGreaterThanOrEqual(3.5);
  expect(value).toBeLessThan(5);
  expect(value).toBeLessThanOrEqual(5.5);

  expect(value).toBe(4);
  expect(value).toEqual(4);
});

test("there is no I in team", () => {
  expect("team").not.toMatch(/I/);
});

test("there is no ea in team", () => {
  expect("team").toMatch(/ea/);
});
