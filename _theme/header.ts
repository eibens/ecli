import { Node } from "https://deno.land/x/ansiml@v0.0.3/mod.ts";
import { Blocks, Heading } from "./core.ts";

export type Header = {
  icon: Node;
  name: string;
  description: string;
};

export function Header(opts: Header): Node {
  return Blocks(
    Heading(opts.icon, opts.name),
    opts.description,
  );
}
