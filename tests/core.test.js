require("jasmine-check").install();

const im = require("immutable");
const core = require("../out/sheer/core");

describe("has?", () => {
  check.it(
    "expect to return true if the map has a key",
    gen.arrayOrObject(gen.any),
    a => {
      Object.keys(a).forEach(key => {
        expect(core["has?"](key, a)).toBe(true);
      });
    }
  );

  check.it(
    "expect to return false if the map has a key",
    gen.arrayOrObject,
    gen.string,
    (a, b) => {
      expect(core["has?"](b, a)).toBe(false);
    }
  );
});

describe("+", () => {
  check.it(
    "should take any numbers and return the addition of them",
    gen.array(gen.number, { size: 5 }),
    a => {
      expect(core["+"](...a)).toBe(a[0] + a[1] + a[2] + a[3] + a[4]);
    }
  );
});

describe("-", () => {
  check.it(
    "should take any numbers and return the subtraction of them",
    gen.array(gen.number, { size: 5 }),
    a => {
      expect(core["-"](...a)).toBe(a[0] - a[1] - a[2] - a[3] - a[4]);
    }
  );
});

describe("*", () => {
  check.it(
    "should take any numbers and return the multiplication of them",
    gen.array(gen.number, { size: 5 }),
    a => {
      expect(core["*"](...a)).toBe(a[0] * a[1] * a[2] * a[3] * a[4]);
    }
  );
});

describe("/", () => {
  check.it(
    "should take any numbers and return the division of them",
    gen.array(gen.number, { size: 5 }),
    a => {
      expect(core["/"](...a)).toBe(a[0] / a[1] / a[2] / a[3] / a[4]);
    }
  );
});

describe("first", () => {
  check.it(
    "should take an immutable list and returns the first element, or null if the list is empty",
    gen.array(gen.any),
    a => {
      expect(core.first(im.List(a))).toBe(a[0] || null);
    }
  );
});

describe("last", () => {
  check.it(
    "should take an immutable list and returns the last element, or null if the list is empty",
    gen.array(gen.any),
    a => {
      expect(core.last(im.List(a))).toBe(a[a.length - 1] || null);
    }
  );
});

describe("tail", () => {
  check.it(
    "should take an immutable list and returns it, except for the first element",
    gen.array(gen.any),
    a => {
      expect(core.tail(im.List(a)).toJS()).toEqual(a.slice(1));
    }
  );
});
