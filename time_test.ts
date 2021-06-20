import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.97.0/testing/asserts.ts";
import { format, Interval } from "./time.ts";

Deno.test("format default options", () => {
  assertEquals(
    format(),
    "yyyy-MM-ddTHH:mm:ss.SSS",
  );
});

Deno.test("format works if min equals max", () => {
  assertEquals(
    format({ min: "day", max: "day" }),
    "-dd",
  );
});

Deno.test("format throws if min is greater than max", () => {
  assertThrows(() => {
    format({ min: "day", max: "minute" });
  });
});

Deno.test("format min option", () => {
  const cases: [Interval, string][] = [
    ["year", "yyyy"],
    ["month", "yyyy-MM"],
    ["day", "yyyy-MM-dd"],
    ["hour", "yyyy-MM-ddTHH"],
    ["minute", "yyyy-MM-ddTHH:mm"],
    ["second", "yyyy-MM-ddTHH:mm:ss"],
    ["millisecond", "yyyy-MM-ddTHH:mm:ss.SSS"],
  ];
  cases.forEach(([min, expected]) => {
    assertEquals(
      format({ min }),
      expected,
    );
  });
});

Deno.test("format max option", () => {
  const cases: [Interval, string][] = [
    ["year", "yyyy-MM-ddTHH:mm:ss.SSS"],
    ["month", "-MM-ddTHH:mm:ss.SSS"],
    ["day", "-ddTHH:mm:ss.SSS"],
    ["hour", "THH:mm:ss.SSS"],
    ["minute", ":mm:ss.SSS"],
    ["second", ":ss.SSS"],
    ["millisecond", ".SSS"],
  ];
  cases.forEach(([max, expected]) => {
    assertEquals(
      format({ max }),
      expected,
    );
  });
});
