import { Node } from "https://deno.land/x/ansiml@v0.0.3/mod.ts";
import { CodeLine, Definition, Words } from "./core.ts";
import { Flag } from "./flag.ts";

export type Option = Flag & {
  alias?: string;
  text: Node;
};

export function Option(opts: Option) {
  const alias = Flag({ ...opts, name: opts.alias || "" });
  return Definition(
    Words(
      ...(opts.alias ? [CodeLine(alias)] : []),
      CodeLine(Flag(opts)),
    ),
    opts.text,
  );
}
