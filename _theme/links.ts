import { Node } from "https://deno.land/x/ansiml@v0.0.3/mod.ts";
import { Emoji } from "./emoji.ts";
import { Blocks, Definition, Heading, Url } from "./core.ts";

export type Link = {
  url: string;
  text: Node;
};

export function Link(opts: Link): Node {
  return Definition(
    Url(opts.url),
    opts.text,
  );
}

export type Links = {
  items: {
    url: string;
    text: Node;
  }[];
};

export function Links(opts: Links) {
  return Blocks(
    Heading(Emoji("globeWithMeridians"), "Links"),
    ...opts.items.map(Link),
  );
}
