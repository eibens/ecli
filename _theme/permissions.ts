import { Node } from "https://deno.land/x/ansiml@v0.0.3/mod.ts";
import { Blocks, Heading, Sequence } from "./core.ts";
import { Emoji } from "./emoji.ts";
import { Permission } from "./permission.ts";
import { Option } from "./option.ts";

export type Permissions = {
  items?: Permission[];
};

export function Permissions(opts: Permissions = {}): Node {
  const title = "Permissions";
  const permissions = opts.items || [];
  if (permissions.length === 0) {
    return Blocks(
      Heading(Emoji("greenSquare"), title),
      "No Deno permissions needed, or none documented.",
    );
  } else if (permissions.length === 1) {
    return Blocks(
      Heading(Emoji("alert"), title),
      Sequence("This program uses the following Deno permission:"),
      Permission(permissions[0]),
    );
  }
  return MultiPermissions({ title, permissions });
}

function MultiPermissions(opts: {
  title: string;
  permissions: Permission[];
}) {
  return Blocks(
    Heading(Emoji("alert"), opts.title),
    Sequence("This program uses the following Deno permissions:"),
    ...opts.permissions.map(Permission),
    Option({
      text: "Allow full access. Includes all permissions above.",
      alias: "A",
      type: "flag",
      name: "allow-all",
    }),
  );
}
