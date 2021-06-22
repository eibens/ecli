import { log } from "../log.ts";
import { Demo, Optional } from "./core.ts";
import { Help } from "./help.ts";

Deno.test(Help.name, () => {
  log(
    Demo({
      title: "minimal example",
      func: Help,
      input: [{
        header: {
          icon: "EC",
          name: "ecli",
          description: "Does something for you.",
        },
      }],
    }),
    Demo({
      title: "basic example",
      func: Help,
      input: [{
        header: {
          icon: "EC",
          name: "ecli",
          description: "Does something for you.",
        },
        usage: {
          binary: "ecli",
          module: "https://deno.land/x/ecli/cli.ts",
          permissions: true,
          args: Optional("options"),
        },
        permissions: {
          items: [{
            name: "net",
            text: "Let us do some networking.",
          }],
        },
        options: {
          items: [{
            type: "flag",
            name: "foo",
            text: "An option that affects this program somehow.",
          }],
        },
        links: {
          items: [{
            url: "https://github.com/eibens/ecli",
            text: "Source code repository.",
          }],
        },
      }],
    }),
  );
});
