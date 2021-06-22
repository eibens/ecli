import { log } from "../log.ts";
import { Demo } from "./core.ts";
import { Hints } from "./hints.ts";

Deno.test(Hints.name, () => {
  log(
    Demo({
      title: "minimal example",
      func: Hints,
      input: [{
        binary: "ecli",
      }],
    }),
  );
});
