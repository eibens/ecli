import { Demo } from "./text.ts";
import { log } from "./log.ts";
import { Help } from "./help.ts";

log(
  Demo({
    title: "minimal example",
    func: Help,
    input: [{
      icon: "EC",
      name: "ecli",
      description: "Does something for you.",
    }],
  }),
  Demo({
    title: "basic example",
    func: Help,
    input: [{
      icon: "EC",
      name: "ecli",
      description: "Does something for you.",
      usage: {
        binary: "ecli",
        module: "https://deno.land/x/ecli/cli.ts",
      },
      permissions: {
        permissions: [{
          type: "net",
          text: "Let us do some networking.",
        }],
      },
      options: {
        options: [{
          type: "flag",
          name: "foo",
          text: "An option that affects this program somehow.",
        }],
      },
    }],
  }),
);
