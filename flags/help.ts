/** EXTERNALS **/

import { kebabCase } from "tiny-case";
import type { Struct } from "superstruct";

/** HELPERS **/

function stringifyFlag(options: {
  name: string;
  type: string;
  text: string;
  defaultValue?: unknown;
}): [string, string] {
  const { name, type, text, defaultValue } = options;

  const lhs = `--` + kebabCase(name);
  const hasRhs = type !== undefined && type !== "boolean";
  const rhs = hasRhs ? `=<${type}>` : "";
  const col1 = `${lhs}${rhs}`;

  const hasDefault = defaultValue !== undefined && type !== "boolean";
  const def = hasDefault ? ` [default: ${defaultValue}]` : "";
  const col2 = `${text}${def}`;

  return [col1, col2];
}

function stringifySection(
  title: string,
  entries: [string, string][],
): string[] {
  if (entries.length === 0) return [];
  const keys = entries.map(([key]) => key);
  const values = entries.map(([, value]) => value);
  const maxKeyLength = keys.reduce((max, key) => Math.max(max, key.length), 0);
  const paddedKeys = keys.map((key) => key.padEnd(maxKeyLength));
  const lines = paddedKeys.map((key, i) => `  ${key}  ${values[i]}`);
  return [`${title}:\n${lines.join("\n")}`];
}

/** MAIN **/

export type HelpOptions<T> = {
  usage: string;
  type: Struct<T, { [K in keyof T]: Struct<T[K]> }>;
  defaults?: Partial<T>;
  flags: {
    [K in keyof T]: string;
  };
};

export function help<T>(options: HelpOptions<T>): string {
  const { usage, type, flags, defaults } = options;

  const entries = Object.entries(flags) as [keyof T, string][];
  const rows = entries
    .map(([name, text]): [string, string] =>
      stringifyFlag({
        type: type.schema[name].type,
        name: String(name),
        text,
        defaultValue: defaults ? defaults[name] : undefined,
      })
    );

  let result = `Usage: ` + usage + "\n";
  if (entries.length) {
    result += "\n" + stringifySection("Options", [
      ["-h, --help", "print this help message"],
      ...rows,
    ]);
  }
  return result;
}
