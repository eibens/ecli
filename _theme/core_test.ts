import { log } from "../log.ts";
import { Demo, Kbd } from "./core.ts";

Deno.test(Kbd.name, () => {
  log(
    Demo({
      title: "basic",
      func: Kbd,
      input: ["Enter"],
    }),
  );
});
