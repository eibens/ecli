import { Node } from "https://deno.land/x/ansiml@v0.0.3/mod.ts";
import { Options } from "./options.ts";
import { Permissions } from "./permissions.ts";
import { Sections } from "./core.ts";
import { Usage } from "./usage.ts";
import { Header } from "./header.ts";
import { Links } from "./links.ts";

export type Help = {
  header: Header;
  usage?: Usage;
  permissions?: Permissions;
  options?: Options;
  links?: Links;
};

export function Help(opts: Help): Node {
  const usage = opts.usage ? [Usage(opts.usage)] : [];
  const permissions = opts.permissions ? [Permissions(opts.permissions)] : [];
  const options = opts.options ? [Options(opts.options)] : [];
  const links = opts.links ? [Links(opts.links)] : [];
  return Sections(
    Header(opts.header),
    ...usage,
    ...permissions,
    ...options,
    ...links,
  );
}
