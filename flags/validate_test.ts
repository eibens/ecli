/** EXTERNALS **/

import { number, object } from "../deps/superstruct.ts";
import { assertEquals, assertThrows } from "../deps/asserts.ts";

/** LOCALS **/

import { validate } from "./validate.ts";

/** HELPERS **/

const KEY = "foo";
const UNKNOWN_KEY = "bar";

const TYPE = object({
  [KEY]: number(),
});

const EMPTY_DATA = {};

const DEFAULT_DATA = {
  [KEY]: 1,
};

const VALID_DATA = {
  [KEY]: 123,
};

const INVALID_DATA = {
  [KEY]: "abc",
};

const UNKNOWN_DATA = {
  [UNKNOWN_KEY]: 1,
};

const OPTIONS = {
  type: TYPE,
};

const OPTIONS_WITH_DEFAULTS = {
  type: TYPE,
  defaults: DEFAULT_DATA,
};

const ERROR_UNKNOWN = `unknown option '${UNKNOWN_KEY}'`;

const ERROR_MISSING = `missing option '${KEY}'`;

const ERROR_INVALID = `invalid option '${KEY}'`;

/** MAIN **/

Deno.test("validate uses provided value", () => {
  assertEquals(
    validate(VALID_DATA, OPTIONS),
    VALID_DATA,
  );
});

Deno.test("validate uses default value", () => {
  assertEquals(
    validate(EMPTY_DATA, OPTIONS_WITH_DEFAULTS),
    DEFAULT_DATA,
  );
});

Deno.test("validate uses provided value over default value", () => {
  assertEquals(
    validate(VALID_DATA, OPTIONS_WITH_DEFAULTS),
    VALID_DATA,
  );
});

Deno.test("validate throws for unknown option", () => {
  assertThrows(
    () => validate(UNKNOWN_DATA, OPTIONS_WITH_DEFAULTS),
    Error,
    ERROR_UNKNOWN,
  );
});

Deno.test("validate throws for missing option without default", () => {
  assertThrows(
    () => validate(EMPTY_DATA, OPTIONS),
    Error,
    ERROR_MISSING,
  );
});

Deno.test("validate throws invalid option error", () => {
  assertThrows(
    () => validate(INVALID_DATA, OPTIONS),
    Error,
    ERROR_INVALID,
  );
});
