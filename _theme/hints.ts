import { Node } from "https://deno.land/x/ansiml@v0.0.3/mod.ts";
import {
  Blocks,
  CommandLine,
  Definition,
  Kbd,
  Optional,
  Words,
} from "./core.ts";

export type Hints = {
  binary: string;
};

export function Hints(opts: Hints): Node {
  return Blocks(
    Blocks(
      Definition(
        Optional("chill"),
        Words("Keep", CommandLine(opts.binary), "running by doing nothing."),
      ),
      Definition(
        Words(Kbd("q"), Kbd("Enter")),
        "Press these keys to quit.",
      ),
      Definition(
        CommandLine(opts.binary, "--help"),
        "Run this for details.",
      ),
    ),
  );
}
