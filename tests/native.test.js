require("jasmine-check").install();

const native = require("../out/sheer/native");

describe("add", () => {
  check.it(
    "should take two arguments and sum them",
    gen.numberWithin(-9999999, 9999999),
    gen.numberWithin(-9999999, 9999999),
    (a, b) => {
      expect(native.add(a, b)).toBe(a + b);
      expect(native.add(a, b)).toBe(native.add(b, a));
    }
  );
});

describe("sub", () => {
  check.it(
    "should take two arguments and subtract them",
    gen.numberWithin(-9999999, 9999999),
    gen.numberWithin(-9999999, 9999999),
    (a, b) => {
      expect(native.sub(a, a)).toBe(0);
      expect(native.sub(a, b)).toBe(a - b);

      if (a !== b) {
        expect(native.sub(a, b)).not.toBe(native.sub(b, a));
      }
    }
  );
});

describe("mul", () => {
  check.it(
    "should take two arguments multiply them",
    gen.numberWithin(-9999999, 9999999),
    gen.numberWithin(-9999999, 9999999),
    (a, b) => {
      expect(native.mul(a, b)).toBe(a * b);
      expect(native.mul(a, b)).toBe(native.mul(b, a));
    }
  );
});

describe("div", () => {
  check.it(
    "should take two arguments and divide them",
    gen.numberWithin(-9999999, 9999999),
    gen.numberWithin(-9999999, 9999999),
    (a, b) => {
      expect(native.div(a, b)).toBe(a / b);
    }
  );
});

describe("discard", () => {
  check.it(
    "should take a function an return a new function discarding its returned value",
    gen.any,
    a => {
      expect(native.discard(a => a)(a)).toBe(undefined);
    }
  );
});

describe("throw", () => {
  check.it("should take an exception and throw it", gen.any, a => {
    expect(() => native.throw(a)).toThrow();
  });
});

describe("try", () => {
  check.it(
    "should take 2 functions and execute the first one, if it fails it will execute the latest",
    () => {
      const catcher = jest.fn();
      native.tryCatch(() => {
        throw "e";
      }, catcher);

      expect(catcher.mock.calls.length).toBe(1);
    }
  );

  check.it(
    "should take 2 functions and execute the first one, if it does not fails it will not execute the latest",
    () => {
      const catcher = jest.fn();
      native.tryCatch(() => {}, catcher);

      expect(catcher).not.toBeCalled();
    }
  );
});

describe("type", () => {
  check.it("should take a value and returns it type", gen.any, a => {
    expect(native.type(a)).toBe(typeof a);
  });
});

describe("apply", () => {
  check.it(
    "should take a function and an array, and call that function with the array applied as arguments",
    gen.array(gen.any),
    a => {
      const fn = jest.fn();

      native.apply(fn, a);

      expect(fn).toBeCalled();
      expect(fn).lastCalledWith(...a);
    }
  );
});

describe("instaciate", () => {
  check.it(
    "should take a class and an array of arguments, and return a new instace of the class",
    gen.array(gen.any),
    a => {
      class C {
        constructor(...args) {
          this.args = args;
        }
      }

      expect(native.instaciate(C, a).args).toEqual(a);
    }
  );
});

describe("isInstance", () => {
  check.it(
    "should take an class and a value, and return if the value is instance of the class",
    gen.any,
    a => {
      class C {}
      expect(native.isInstance(C, a)).toBe(false);
      expect(native.isInstance(C, new C())).toBe(true);
    }
  );
});

describe("not", () => {
  check.it("should take a value and negate it", gen.any, a => {
    expect(native.not(a)).toBe(!a);
  });
});

describe("objects_get", () => {
  check.it(
    "should take a object and a key, it returns the value of that key",
    gen.arrayOrObject,
    a => {
      for (let i in a) {
        expect(native.objects_get(i, a)).toBe(a[i]);
      }
    }
  );
});
