import { log } from "./log.ts";
import { Usage } from "./usage.ts";
import { Optional } from "./options.ts";
import { Demo } from "./text.ts";

log(
  Demo({
    func: Usage,
    title: "no permissions",
    input: [{
      binary: "ecli",
      module: "https://deno.land/x/ecli/cli.ts",
    }],
  }),
  Demo({
    func: Usage,
    title: "permissions and args",
    input: [{
      binary: "ecli",
      module: "https://deno.land/x/ecli/cli.ts",
      permissions: true,
      args: Optional("options"),
    }],
  }),
);
