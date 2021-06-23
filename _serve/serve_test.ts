import { assertMatch } from "https://deno.land/std@0.99.0/testing/asserts.ts";
import { serve } from "./serve.ts";
import { Log } from "./theme.ts";

Deno.test("serve runs server", async () => {
  const output = await testServe({
    args: [""],
    input: "q\n",
    events: [],
  });
  assertMatch(output, /ecli opened/);
  assertMatch(output, /ecli closed/);
});

Deno.test("serve shows hints", async () => {
  const output = await testServe({
    args: [""],
    input: "x\nq\n",
    events: [],
  });
  assertMatch(output, /ecli/);
  assertMatch(output, /chill/);
  assertMatch(output, /--help/);
  assertMatch(output, /Enter/);
  assertMatch(output, /q/);
  assertMatch(output, /ecli closed/);
});

Deno.test("serve logs events", async () => {
  const output = await testServe({
    args: [""],
    input: "q\n",
    events: [{
      type: "custom",
      text: "something happened",
    }],
  });
  assertMatch(output, /custom/);
  assertMatch(output, /something happened/);
});

Deno.test("serve has docs", async () => {
  const output = await testServe({
    args: ["--help"],
    input: "q\n",
    events: [],
  });
  assertMatch(output, /X/);
  assertMatch(output, /ecli/);
  assertMatch(output, /Some text/);
});

// Utils

async function testServe(options: {
  args?: string[];
  input: string;
  events?: Log[];
}) {
  options.args ||= [];
  options.events ||= [];

  let output = "";
  await serve({
    start: (server) => {
      options.events?.forEach(server.log);
      return {
        close: () => {
          return Promise.resolve();
        },
      };
    },
    docs: {
      header: {
        description: "Some text",
        icon: "X",
        name: "ecli",
      },
    },
    process: {
      args: options.args,
      stdin: {
        read: (p: Uint8Array) => {
          options.input.split("").forEach((c, i) => {
            p[i] = c.charCodeAt(0);
          });
          return Promise.resolve(options.input.length);
        },
      },
      stdout: {
        write: (p: Uint8Array) => {
          output += new TextDecoder().decode(p);
          return Promise.resolve(p.byteLength);
        },
      },
    },
  });
  return output;
}
