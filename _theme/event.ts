import { Command, Node } from "https://deno.land/x/ansiml@v0.0.3/mod.ts";
import { Words } from "./core.ts";
import { Time } from "./time.ts";

export type Event = {
  time?: Date;
  type?: string;
  text?: Node;
  prev?: Date;
  timeFormat?: string;
  types?: Record<string, Command[]>;
};

export function Event(opts: Event = {}): Node {
  const types = opts.types || EventTypes;
  const type = opts.type || "event";
  const color = types[type] || [];
  const format = opts.timeFormat || "yyyy-MM-ddTHH:mm:ss.SSS";
  const next = opts.time || new Date();
  const text = opts.text || "";
  return Words(
    Time({
      format,
      next,
      prev: opts.prev,
    }),
    {
      commands: [["gray"]],
      children: [
        "[",
        {
          commands: [...color, ["bold"]],
          children: [type],
        },
        "]",
      ],
    },
    text,
  );
}

export const EventTypes: Record<string, Command[]> = {
  info: [["white"]],
  debug: [["gray"]],
  event: [["gray"]],
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
