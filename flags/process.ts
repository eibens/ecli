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

export type CommandContext = {
  stdin: Deno.Reader;
  stdout: Deno.Writer;
  stderr: Deno.Writer;
  args: string[];
};

export type CommandOptions<T> = {
  type: Struct<T, { [K in keyof T]: Struct<T[K]> }>;
  help: Omit<HelpOptions<T>, "type">;
  defaults?: Partial<T>;
  stdout: Deno.Writer;
  run: (
    context: CommandContext,
    options: T,
  ) => void | Promise<void>;
};

export async function process<T>(
  context: CommandContext,
  options: CommandOptions<T>,
): Promise<void> {
  const { stdout, type, defaults, run } = options;

  const boolean: string[] = [];
  for (const key in type.schema) {
    if (type.schema[key].type === "boolean") {
      boolean.push(key);
    }
  }

  const parsed = parse(context.args, {
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
    await run({
      ...context,
      args: parsed.args,
    }, opts);
  } catch (error) {
    await log(stdout, `error: ${error.message}`);
  }
}
