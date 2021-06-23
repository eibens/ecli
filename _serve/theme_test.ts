import { CloseSection, Docs, HintSection, Log, OpenSection } from "./theme.ts";
import { Demo, log } from "../mod.ts";

Deno.test(Docs.name, () => {
  log(
    Demo({
      title: "minimal",
      func: Docs,
      input: [{
        header: {
          icon: "●",
          name: "ecli",
          description: "This is a description.",
        },
      }],
    }),
  );
});

Deno.test(OpenSection.name, () => {
  log(
    Demo({
      title: "basic",
      func: OpenSection,
      input: [{
        icon: "●",
        name: "ecli",
        description: "This is a description.",
      }],
    }),
  );
});

Deno.test(HintSection.name, () => {
  log(
    Demo({
      title: "basic",
      func: HintSection,
      input: [{
        name: "ecli",
      }],
    }),
  );
});

Deno.test(Log.name, () => {
  log(
    Demo({
      title: "basic",
      func: Log,
      input: [{
        type: "active",
        text: "something happened",
      }],
    }),
  );
});

Deno.test(CloseSection.name, () => {
  log(
    Demo({
      title: "basic",
      func: CloseSection,
      input: [{
        name: "ecli",
      }],
    }),
  );
});
