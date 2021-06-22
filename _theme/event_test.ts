import { log } from "../log.ts";
import { Demo } from "./core.ts";
import { Event, EventTypes } from "./event.ts";

Deno.test(Event.name, () => {
  log(
    Demo({
      title: "minimal",
      func: Event,
      input: [],
    }),
    Demo({
      title: "basic",
      func: Event,
      input: [{
        type: "start",
        text: "it begins",
      }],
    }),
    Demo({
      title: "time format",
      func: Event,
      input: [{
        timeFormat: "HH:mm",
      }],
    }),
    Demo({
      title: "previous time",
      func: Event,
      input: [{
        prev: new Date(Date.now() - 10000),
      }],
    }),
    Demo({
      title: "unknown type",
      func: Event,
      input: [{
        type: "unknown",
      }],
    }),
    Demo({
      title: "custom type",
      func: Event,
      input: [{
        type: "custom",
        types: {
          custom: [["bgBlue"], ["white"]],
        },
        text: "something special happened",
      }],
    }),
    ...Object.keys(EventTypes).map((type) => {
      return Demo({
        title: `${type} type`,
        func: Event,
        input: [{
          type,
        }],
      });
    }),
  );
});
