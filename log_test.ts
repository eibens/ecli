import { assertEquals } from "https://deno.land/std@0.97.0/testing/asserts.ts";
import { log, logFile, logString, logWriter } from "./log.ts";

Deno.test("log with node works", () => {
  log({
    commands: [["bold"]],
    children: ["this is bold text"],
  });
});

Deno.test("logFile writes to file", async () => {
  const tmp = await Deno.makeTempFile();
  await logFile(tmp, "foo");
  assertEquals(await Deno.readTextFile(tmp), "foo");
});

Deno.test("logString writes to string", () => {
  assertEquals(
    logString("foo"),
    "foo",
  );
});

Deno.test("logWrite writes to writer", async () => {
  const tmp = await Deno.makeTempFile();
  const writer = await Deno.open(tmp, {
    write: true,
  });
  await logWriter(writer, "foo");
  writer.close();
  assertEquals(
    await Deno.readTextFile(tmp),
    "foo",
  );
});
