import { Demo } from "./text.ts";
import { colors, History } from "./history.ts";
import { log } from "./log.ts";

const types = Object.keys(colors);

const messages: string[] = [
  "letting you know",
  "something happened",
  "this is an event",
];

function date(secondsFromNow = 0) {
  return new Date(Date.now() + secondsFromNow * 1000);
}

const e1 = {
  type: "info",
  time: date(),
  message: messages[0],
};

const e2 = {
  type: "done",
  time: date(12345),
  message: messages[1],
};

const e3 = {
  type: "unknown",
  time: date(),
  message: messages[2],
};

const all = types.map((type, i) => ({
  type,
  message: messages[i % messages.length],
  time: date(i * i * 1234),
}));

log(
  Demo({
    title: "minimal example",
    func: History,
    input: [{}],
  }),
  Demo({
    title: "single event",
    func: History,
    input: [{
      events: [e1],
    }],
  }),
  Demo({
    title: "unknown type",
    func: History,
    input: [{
      events: [e3],
    }],
  }),
  Demo({
    title: "truncated time format",
    func: History,
    input: [{
      timeFormatMax: "hour",
      timeFormatMin: "second",
      events: [e1, e2],
    }],
  }),
  Demo({
    title: "all event types",
    func: History,
    input: [{
      events: all,
    }],
  }),
);
