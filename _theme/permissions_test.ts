import { log } from "../log.ts";
import { Demo } from "./core.ts";
import { Permission } from "./permission.ts";
import { Permissions } from "./permissions.ts";

const net: Permission = {
  name: "net",
  text: "This program uses the network.",
};

const run: Permission = {
  name: "run",
  value: "git",
  text: "This program does something with Git.",
};

const names: Deno.PermissionName[] = [
  "env",
  "hrtime",
  "net",
  "plugin",
  "read",
  "run",
  "write",
];

const all: Permission[] = names.map((name) => ({
  name,
  text: `This program may use permission type \`${name}\`.`,
}));

Deno.test(Permissions.name, () => {
  log(
    Demo({
      func: Permissions,
      title: "minimal example",
      input: [],
    }),
    Demo({
      func: Permissions,
      title: "single permission",
      input: [{
        items: [net],
      }],
    }),
    Demo({
      func: Permissions,
      title: "single permission with specifier",
      input: [{
        items: [run],
      }],
    }),
    Demo({
      func: Permissions,
      title: "multiple permissions",
      input: [{
        items: [net, run],
      }],
    }),
    Demo({
      func: Permissions,
      title: "all available permissions",
      input: [{
        items: all,
      }],
    }),
  );
});
