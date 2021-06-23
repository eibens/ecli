import { assert } from "https://deno.land/std@0.97.0/testing/asserts.ts";
import { hasHelpFlag } from "./flags.ts";

Deno.test("hasHelpFlag finds -h", () => {
  assert(hasHelpFlag(["", "-h", ""]));
});

Deno.test("hasHelpFlag finds --help", () => {
  assert(hasHelpFlag(["", "--help", ""]));
});

Deno.test("hasHelpFlag is false without flag", () => {
  assert(!hasHelpFlag(["", ""]));
});
