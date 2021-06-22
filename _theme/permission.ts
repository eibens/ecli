import { Node } from "https://deno.land/x/ansiml@v0.0.3/mod.ts";
import { Option } from "./option.ts";

export type Permission = {
  name: Deno.PermissionName;
  text: Node;
  value?: Node;
};

export function Permission(opts: Permission): Node {
  const isFlag = ["hrtime", "plugin"].includes(opts.name);
  return Option({
    text: opts.text,
    name: "allow-" + opts.name,
    type: isFlag ? "flag" : "dual",
    value: opts.value,
  });
}
