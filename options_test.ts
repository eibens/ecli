import { assertEquals } from "https://deno.land/std@0.97.0/testing/asserts.ts";
import { Option } from "./option.ts";

Deno.test("flag", () => {
  assertEquals(
    Option({
      name: "foo",
    }),
    "--foo",
  );
});
Deno.test("flag with single char", () => {
  assertEquals(
    Option({
      name: "f",
    }),
    "-f",
  );
});
