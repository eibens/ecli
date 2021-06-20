import { Node } from "https://deno.land/x/ansiml@v0.0.3/mod.ts";
import { Options } from "./options.ts";
import { Permissions } from "./permissions.ts";
import { Blocks, Heading, Sections } from "./text.ts";
import { Usage } from "./usage.ts";

export type Help = {
  icon: Node;
  name: string;
  description: string;
  usage?: Usage;
  permissions?: Permissions;
  options?: Options;
};

export function Help(opts: Help): Node {
  return Sections(
    Blocks(
      Heading(opts.icon, opts.name),
      opts.description,
    ),
    ...(opts.usage ? [Usage(opts.usage)] : []),
    ...(opts.permissions ? [Permissions(opts.permissions)] : []),
    ...(opts.options ? [Options(opts.options)] : []),
  );
}
