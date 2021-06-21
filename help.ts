import { Node } from "https://deno.land/x/ansiml@v0.0.3/mod.ts";
import { Options } from "./options.ts";
import { Permissions } from "./permissions.ts";
import { Blocks, Definition, Heading, Sections, Url } from "./text.ts";
import { Usage } from "./usage.ts";
import emoji from "./emoji.ts";

export type Help = {
  icon: Node;
  name: string;
  description: string;
  repository?: string;
  usage?: Usage;
  permissions?: Permissions;
  options?: Options;
};

export function Help(opts: Help): Node {
  const title = Blocks(
    Heading(opts.icon, opts.name),
    opts.description,
  );
  const usage = opts.usage ? [Usage(opts.usage)] : [];
  const permissions = opts.permissions ? [Permissions(opts.permissions)] : [];
  const options = opts.options ? [Options(opts.options)] : [];
  const links = opts.repository
    ? [Blocks(
      Heading(emoji.globeWithMeridians, "Links"),
      Definition(
        Url(opts.repository),
        "Source code repository.",
      ),
    )]
    : [];
  return Sections(
    title,
    ...usage,
    ...permissions,
    ...options,
    ...links,
  );
}
