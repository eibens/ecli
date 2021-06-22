import { Node } from "https://deno.land/x/ansiml@v0.0.3/mod.ts";
import { Optional, Required, Sequence } from "./core.ts";

export type Flag = {
  type: "flag" | "param" | "dual";
  name: string;
  value?: Node;
};

export function Flag(opts: Flag): Node {
  const prefix = opts.name.length === 1 ? "-" : "--";
  const lhs = prefix + opts.name;
  if (opts.type === "flag") return lhs;
  const value = opts.value || Required(opts.name);
  const rhs = opts.type === "dual"
    ? Optional("=", value)
    : Sequence("=", value);
  return Sequence(lhs, rhs);
}
