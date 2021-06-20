import { log } from "./log.ts";
import { Permission, Permissions, PermissionType } from "./permissions.ts";
import { Demo } from "./text.ts";

const net: Permission = {
  type: "net",
  description: "This program uses the network.",
};

const run: Permission = {
  type: "run",
  value: "git",
  description: "This program does something with Git.",
};

const types: PermissionType[] = [
  "env",
  "hrtime",
  "net",
  "plugin",
  "read",
  "run",
  "write",
];

const all: Permission[] = types.map((type) => ({
  type,
  specifier: `<${type}>`,
  description: `This program may use permission type \`${type}\`.`,
}));

log(
  Demo({
    func: Permissions,
    title: "no permissions",
    input: {},
  }),
  Demo({
    func: Permissions,
    title: "single permission",
    input: {
      permissions: [net],
    },
  }),
  Demo({
    func: Permissions,
    title: "single permission with specifier",
    input: {
      permissions: [run],
    },
  }),
  Demo({
    func: Permissions,
    title: "multiple permissions",
    input: {
      permissions: [net, run],
    },
  }),
  Demo({
    func: Permissions,
    title: "all available permissions",
    input: {
      permissions: all,
    },
  }),
);
