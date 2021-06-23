import { Node } from "https://deno.land/x/ansiml@v0.0.3/mod.ts";
import {
  Blocks,
  Divider,
  Emoji,
  Event,
  Header,
  Heading,
  Help,
  Hints,
  Lines,
  Sections,
  Sequence,
  Words,
} from "../_theme/mod.ts";

export type Docs = Help;

export function Docs(options: Docs): Node {
  return Sequence("\n", Help(options), "\n\n");
}

export function OpenSection(options: Header): Node {
  return Sequence(
    "\n",
    Sections(
      Header(options),
      Blocks(
        Heading(
          Emoji("bell"),
          Words(
            options.name,
            "opened",
          ),
        ),
      ),
    ),
    "\n\n",
  );
}

export function CloseSection(options: {
  name: string;
}) {
  return Sequence(
    "\n\n\n",
    Heading(
      Emoji("zzz"),
      Words(
        options.name,
        "closed",
      ),
    ),
    "\n\n",
  );
}

export function HintSection(options: {
  name: string;
}) {
  return Lines(
    Divider(),
    Blocks(
      Heading(
        Emoji("questionMark"),
        "What do you want to do?",
      ),
      Hints({
        binary: options.name,
      }),
    ),
    Divider(),
    "",
  );
}

export type Log = Event;

export function Log(options: Log) {
  return Sequence(
    Event(options),
    "\n",
  );
}
