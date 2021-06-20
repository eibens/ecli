import { Demo, Kbd, log } from "./mod.ts";

log(
  Demo({
    title: "basic example",
    func: Kbd,
    input: ["Enter"],
  }),
);
