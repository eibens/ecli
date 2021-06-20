import { Command, Node } from "https://deno.land/x/ansiml@v0.0.3/mod.ts";
import { Lines, Words } from "./text.ts";
import { format as formatTime } from "https://deno.land/std@0.99.0/datetime/mod.ts";
import { format as getTimeFormat, Interval } from "./time.ts";

export type Event = {
  time: Date;
  type: string;
  message: Node;
};

export type History = {
  events: Event[];
  types?: Record<string, Command[]>;
  timeFormatMin?: Interval;
  timeFormatMax?: Interval;
};

export function History(opts: History): Node {
  const types = opts.types || colors;
  const timeFormat = getTimeFormat({
    min: opts.timeFormatMin,
    max: opts.timeFormatMax,
  });
  const events: Node[] = [];
  for (let i = 0; i < opts.events.length; i++) {
    const prev = opts.events[i - 1];
    events.push(Event({
      types,
      timeFormat,
      prev: prev ? prev.time : undefined,
      ...opts.events[i],
    }));
  }
  return Lines(...events);
}

export const colors: Record<string, Command[]> = {
  info: [["white"]],
  debug: [["gray"]],
  done: [["green"]],
  success: [["green"]],
  warn: [["yellow"]],
  warning: [["yellow"]],
  fail: [["red"]],
  error: [["red"]],
  live: [["cyan"]],
  active: [["cyan"]],
  online: [["cyan"]],
  start: [["cyan"]],
  open: [["cyan"]],
  inactive: [["magenta"]],
  offline: [["magenta"]],
  stop: [["magenta"]],
  close: [["magenta"]],
};

function Event(
  opts: Event & {
    prev?: Date;
    timeFormat: string;
    types: Record<string, Command[]>;
  },
): Node {
  const color = opts.types[opts.type] || [];
  return Words(
    Time(opts.timeFormat, opts.time, opts.prev),
    {
      commands: [["gray"]],
      children: [
        "[",
        {
          commands: [...color, ["bold"]],
          children: [opts.type],
        },
        "]",
      ],
    },
    opts.message,
  );
}

function Time(format: string, next: Date, prev?: Date): Node {
  const style: Command[] = [["italic"], ["gray"], ["underline"]];
  const prefixStyle: Command[] = [["italic"], ["gray"]];

  const nextTs = formatTime(next, format);
  if (!prev) return { commands: style, children: [nextTs] };
  const prevTs = formatTime(prev, format);
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
