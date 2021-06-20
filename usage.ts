import { Node } from "https://deno.land/x/ansiml@v0.0.3/mod.ts";
import {
  Blocks,
  Border,
  CommandLine,
  Definition,
  Heading,
  Url,
  Words,
} from "./text.ts";
import emoji from "./emoji.ts";
import { Optional } from "./options.ts";

export type Usage = {
  binary: string;
  module: string;
  permissions?: boolean;
  args?: Node;
};

export function Usage(opts: Usage): Node {
  return Blocks(
    Heading(emoji.questionMark, "Usage"),
    Definition(
      CommandLine(opts.binary, ...(opts.args ? [opts.args] : [])),
      "Run local installation.",
    ),
    Definition(
      CommandLine(
        "deno",
        "run",
        ...(opts.permissions ? [Optional("permissions")] : []),
        Url(opts.module),
        ...(opts.args ? [opts.args] : []),
      ),
      "Run from URL with Deno.",
    ),
    Definition(
      CommandLine(
        "deno",
        "install",
        ...(opts.permissions ? [Optional("permissions")] : []),
        Url(opts.module),
      ),
      "Install locally with Deno.",
    ),
    Words(
      "Deno",
      Border(["(", ")"], Url("https://deno.land")),
      "is needed to run or install this program.",
    ),
  );
}
