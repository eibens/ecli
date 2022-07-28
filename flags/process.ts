/** EXTERNALS **/

import { Struct } from "superstruct";

/** LOCALS **/

import { parse } from "./parse.ts";
import { validate } from "./validate.ts";
import { help, HelpOptions } from "./help.ts";

/** HELPERS **/

async function log(writer: Deno.Writer, text: string) {
  await writer.write(new TextEncoder().encode(text + "\n"));
}

/** MAIN **/

export type ProcessOptions<T> = {
  type: Struct<T, { [K in keyof T]: Struct<T[K]> }>;
  help: Omit<HelpOptions<T>, "type">;
  defaults?: Partial<T>;
  stdout: Deno.Writer;
  run: (args: string[], options: T) => void | Promise<void>;
};

export async function process<T>(
  args: string[],
  options: ProcessOptions<T>,
): Promise<void> {
  const { stdout, type, defaults, run } = options;

  const boolean: string[] = [];
  for (const key in type.schema) {
    if (type.schema[key].type === "boolean") {
      boolean.push(key);
    }
  }

  const parsed = parse(args, {
    boolean,
    help: true,
  });

  if (parsed.help) {
    const helpText = help({
      type,
      defaults,
      flags: options.help.flags,
      usage: options.help.usage,
    });
    await log(stdout, helpText);
    return;
  }

  try {
    const opts = validate(parsed.data, {
      defaults,
      type,
    });
    await run(parsed.args, opts);
  } catch (error) {
    await log(stdout, `error: ${error.message}`);
  }
}
