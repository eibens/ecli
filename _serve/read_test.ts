import {
  assertEquals,
  assertThrowsAsync,
} from "https://deno.land/std@0.99.0/testing/asserts.ts";
import { readUntil } from "./read.ts";

Deno.test("readUntil stops after matching line", async () => {
  const lines = ["a", "b", "q"];

  const reader: Deno.Reader = {
    read: (p: Uint8Array) => {
      const item = lines.shift();
      if (item == null) return Promise.resolve(0);
      const line = item + "\n";
      line.split("").forEach((c, i) => {
        p[i] = c.charCodeAt(0);
      });
      return Promise.resolve(line.length);
    },
  };

  const line = await readUntil(
    reader,
    (x) => Promise.resolve(x === "q" ? "close" : null),
  );

  assertEquals(line, "close");
});

Deno.test("readUntil throws if no match was found", () => {
  const reader: Deno.Reader = {
    read: (_: Uint8Array) => {
      return Promise.resolve(null);
    },
  };
  assertThrowsAsync(
    async () => {
      await readUntil(
        reader,
        (x) => Promise.resolve(x === "q" ? "close" : null),
      );
    },
    Error,
    "readUntil",
  );
});
