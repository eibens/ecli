import { assertEquals } from "std/testing/asserts.ts";
import { parse } from "./parse.ts";

Deno.test("parse understands boolean flag before positional argument", () => {
  const result = parse(["--aa", "bb"], {
    boolean: ["aa"],
  });
  assertEquals(result.data, {
    aa: true,
  });
});
