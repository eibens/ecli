import { Command, Node } from "https://deno.land/x/ansiml@v0.0.3/mod.ts";
import { format as formatTime } from "https://deno.land/std@0.99.0/datetime/mod.ts";

export type Time = {
  format: string;
  next: Date;
  prev?: Date;
};

export function Time(opts: Time): Node {
  const style: Command[] = [["italic"], ["gray"], ["underline"]];
  const prefixStyle: Command[] = [["italic"], ["gray"]];
  const nextTs = formatTime(opts.next, opts.format);
  if (!opts.prev) return { commands: style, children: [nextTs] };
  const prevTs = formatTime(opts.prev, opts.format);
  const prefix = getPrefix(prevTs, nextTs);
  return {
    commands: [],
    children: [{
      commands: prefixStyle,
      children: [prefix],
    }, {
      commands: style,
      children: [nextTs.substr(prefix.length)],
    }],
  };
}

function getPrefix(a: string, b: string) {
  let prefix = "";
  for (let i = 0; i < Math.min(a.length, b.length); i++) {
    if (a[i] !== b[i]) break;
    prefix += a[i];
  }
  return prefix;
}
