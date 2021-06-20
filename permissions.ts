import { Node } from "https://deno.land/x/ansiml@v0.0.3/mod.ts";
import { Blocks, Heading, Sequence } from "./text.ts";
import emoji from "./emoji.ts";
import { Option } from "./options.ts";

export type PermissionType =
  | "env"
  | "hrtime"
  | "net"
  | "plugin"
  | "read"
  | "run"
  | "write";

export type Permission = {
  /**
   * An identifier for the permission type.
   */
  type: PermissionType;

  /**
   * A short description of the reason for the permission.
   */
  text: string;

  /**
   * The specific value for the permission.
   */
  value?: string;
};

export type Permissions = {
  permissions?: Permission[];
};

export function Permissions(opts: Permissions = {}): Node {
  const title = "Permissions";
  const permissions = opts.permissions || [];
  if (permissions.length === 0) {
    return Blocks(
      Heading(emoji.greenSquare, title),
      "No Deno permissions needed, or none documented.",
    );
  }
  if (permissions.length === 1) {
    return Blocks(
      Heading(emoji.alert, title),
      Sequence("This program uses the following Deno permission:"),
      Permission(permissions[0]),
    );
  }
  const allowAll = Option({
    text: "Allow full access. Includes all permissions above.",
    alias: "A",
    type: "flag",
    name: "allow-all",
  });
  return Blocks(
    Heading(emoji.alert, title),
    Sequence("This program uses the following Deno permissions:"),
    ...permissions.map(Permission),
    ...(permissions.length > 1 ? [allowAll] : []),
  );
}

export function Permission(opts: Permission): Node {
  const isFlag = ["hrtime", "plugin"].includes(opts.type);
  return Option({
    text: opts.text,
    name: "allow-" + opts.type,
    type: isFlag ? "flag" : "dual",
    value: opts.value,
  });
}
