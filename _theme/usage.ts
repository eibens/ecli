import { Node } from "https://deno.land/x/ansiml@v0.0.3/mod.ts";
import {
  Blocks,
  Border,
  CommandLine,
  Definition,
  Heading,
  Optional,
  Url,
  Words,
} from "./core.ts";
import { Emoji } from "./emoji.ts";

export type Usage = {
  binary: string;
  module: string;
  permissions?: boolean;
  args?: Node;
};

export function Usage(opts: Usage): Node {
  return Blocks(
    Heading(Emoji("questionMark"), "Usage"),
    Definition(
      CommandLine(opts.binary, ...(opts.args ? [opts.args] : [])),
      "Run local installation.",
    ),
    Words(
      "Deno",
      Border(["(", ")"], Url("https://deno.land")),
      "is needed to run or install this program.",
    ),
    Definition(
      CommandLine(
        "deno",
        "run",
        ...(opts.permissions ? [Optional("permissions")] : []),
        Url(opts.module),
        ...(opts.args ? [opts.args] : []),
      ),
      "Run most recent version.",
    ),
    Definition(
      CommandLine(
        "deno",
        "install",
        ...(opts.permissions ? [Optional("permissions")] : []),
        Url(opts.module),
      ),
      "Install most recent version.",
    ),
  );
}
