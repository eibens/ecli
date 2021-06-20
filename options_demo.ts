import { log } from "./log.ts";
import { Demo } from "./text.ts";
import { Options } from "./options.ts";

log(
  Demo({
    title: "option types",
    func: Options,
    input: {
      options: [{
        text: "A boolean flag without a value.",
        type: "flag",
        name: "silent",
      }, {
        text: "A parametric option with a value.",
        type: "param",
        name: "port",
      }, {
        text: "A parametric option that can be also used as a flag.",
        type: "dual",
        name: "allow-read",
      }, {
        text: "A parametric option with a custom value string.",
        type: "param",
        name: "allow-net",
        value: "<hostname>:<port>",
      }],
    },
  }),
);
