import { Node } from "https://deno.land/x/ansiml@v0.0.3/mod.ts";
import { Emoji } from "./emoji.ts";
import { Blocks, Heading } from "./core.ts";
import { Option } from "./option.ts";

export type Options = {
  items?: Option[];
};

export function Options(opts: Options = {}): Node {
  const options = opts.items || [];
  return Blocks(
    Heading(Emoji("tools"), "Options"),
    ...options.map(Option),
  );
}
