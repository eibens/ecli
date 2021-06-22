import { Node } from "https://deno.land/x/ansiml@v0.0.3/mod.ts";

export function Definition(head: Node, ...children: Node[]) {
  return Lines(head, Sequence("\t", ...children));
}

export function Heading(icon: Node, ...children: Node[]): Node {
  return Words(icon, {
    commands: [["bold"]],
    children,
  });
}

export function CommandLine(bin: string, ...args: Node[]): Node {
  return CodeLine(Words(
    {
      commands: [["gray"]],
      children: ["$"],
    },
    {
      commands: [["bold"]],
      children: [bin],
    },
    ...args,
  ));
}

export function CodeLine(...children: Node[]) {
  return Code(Border([" "], ...children));
}

export function Divider(): Node {
  return {
    commands: [["gray"]],
    children: ["-".repeat(80)],
  };
}

export function Sections(...children: Node[]) {
  return Separator("\n\n\n", children);
}

export function Blocks(...children: Node[]) {
  return Separator("\n\n", children);
}

export function Lines(...children: Node[]) {
  return Separator("\n", children);
}

export function Words(...children: Node[]) {
  return Separator(" ", children);
}

export function Kbd(...children: Node[]): Node {
  return {
    commands: [["bold"], ["bgBrightBlack"], ["white"]],
    children: [Border([" "], ...children)],
  };
}

export function Url(...children: Node[]): Node {
  return {
    commands: [["blue"], ["underline"]],
    children,
  };
}

export function Code(...children: Node[]): Node {
  return {
    commands: [["bgBlack"], ["white"]],
    children,
  };
}

export function Border(pair: Node[], ...children: Node[]): Node {
  return BorderFunc(Sequence, pair, ...children);
}

export function BorderFunc(
  f: (...args: Node[]) => Node,
  [left, right]: Node[],
  ...children: Node[]
): Node {
  if (!right) right = left;
  return f(left, ...children, right);
}

export function Separator(sep: Node, children: Node[]): Node {
  return Sequence(...children.flatMap((x) => [sep, x]).slice(1));
}

export function Sequence(...children: Node[]): Node {
  return {
    commands: [],
    children,
  };
}

export type Demo<O extends unknown[]> = {
  title: string;
  func: (...opts: O) => Node;
  input: O;
};

export function Demo<O extends unknown[]>(opts: Demo<O>) {
  return Sections(
    Lines(
      "",
      Divider(),
      {
        commands: [["gray"]],
        children: [
          opts.func.name,
          ": ",
          opts.title,
        ],
      },
    ),
    opts.func(...opts.input),
    "",
  );
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
