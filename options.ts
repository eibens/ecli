import { Node } from "https://deno.land/x/ansiml@v0.0.3/mod.ts";
import emoji from "./emoji.ts";
import {
  Blocks,
  Border,
  CodeLine,
  Definition,
  Heading,
  Sequence,
  Words,
} from "./text.ts";

/**
 * Defines an flag for a command line tool.
 */
export type Flag = {
  type: "flag" | "param" | "dual";

  /**
   * The unique name of the option in hyphen-case and without leading hyphens.
   */
  name: string;

  /**
   * Text that describes the syntax of the option's value.
   */
  value?: string;
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

export function Required(...children: Node[]): Node {
  return {
    commands: [["italic"]],
    children: [Border(["<", ">"], ...children)],
  };
}

export function Optional(...children: Node[]): Node {
  return {
    commands: [["italic"], ["gray"]],
    children: [Border(["[", "]"], ...children)],
  };
}

export type Option = Flag & {
  alias?: string;
  text: string;
};

export function Option(opts: Option) {
  const alias = Flag({ ...opts, name: opts.alias || "" });
  return Definition(
    Words(
      ...(opts.alias ? [CodeLine(alias)] : []),
      CodeLine(Flag(opts)),
    ),
    opts.text,
  );
}

export type Options = {
  options?: Option[];
};

export function Options(opts: Options = {}): Node {
  const options = opts.options || []
  return Blocks(
    Heading(emoji.tools, "Options"),
    ...options.map(Option),
  );
}
