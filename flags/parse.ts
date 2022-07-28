/** EXTERNALS **/

import { parse as parseFlags } from "std/flags/mod.ts";

/** HELPERS **/

export type ParseOptions = {
  help?: boolean;
  boolean?: string[];
};

export type ParseResult = {
  data: Record<string, unknown>;
  help: boolean;
  args: string[];
};

export function parse(args: string[], options: ParseOptions = {}): ParseResult {
  const { help, boolean = [] } = options;
  const data: Record<string, unknown> = {};
  const flags = parseFlags(args, {
    alias: help ? { help: "h" } : {},
    boolean: [...boolean, ...(help ? ["help"] : [])],
    unknown: (_arg, key, value) => {
      if (key) data[key] = value;
    },
  });
  for (const key of boolean) {
    data[key] = flags[key];
  }
  return {
    data,
    help: flags.help ? true : false,
    args: flags["_"].map((x) => String(x)),
  };
}
