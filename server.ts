import { Args, parse } from "https://deno.land/std@0.95.0/flags/mod.ts";
import { readLines } from "https://deno.land/std@0.97.0/io/mod.ts";
import { Node } from "https://deno.land/x/ansiml@v0.0.3/mod.ts";
import { logWriter } from "./log.ts";
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
} from "./_theme/mod.ts";

export type StartOptions = {
  close: () => Promise<void>;
  stdin: Deno.Reader;
};

export type ServerEvent = {
  type?: string;
  text?: Node;
  time?: Date;
};

export type ServerOptions = {
  help: Help;
  stdout: Deno.Writer;
};

export type RunOptions = {
  help: Help;
  start: (server: Server) => () => Promise<void>;
};

export type ServerState = {
  log: (...args: Node[]) => Promise<void>;
  args: Args;
  opts: ServerOptions;
  closed: boolean;
  prev?: Date;
};

export type Server = {
  start: (opts: StartOptions) => Promise<void>;
  update: (event: ServerEvent) => void;
  close: () => void;
  readonly state: ServerState;
};

export type Run = {
  args: string[];
  stdout: Deno.Writer;
  stdin: Deno.Reader;
};

export function run(opts: RunOptions) {
  const { start, help } = opts;
  return async ({ args, stdin, stdout }: Run) => {
    // Create logger.
    const log = (...args: Node[]) => logWriter(stdout, ...args);

    // Early exit with help text if 'help' option is specified.
    const showHelp = args.includes("--help") ||
      args.includes("-h");
    if (showHelp) {
      await log(HelpPage(opts.help));
    } else {
      await log(ServerHeader(opts.help.header));
      const server = createServer({
        log,
        args,
        help,
        stdout,
      });
      const close = start(server);
      await server.start({
        stdin,
        close: async () => {
          await close();
          server.close();
        },
      });
    }
  };
}

function createServer(
  opts: ServerOptions & {
    log: (...args: Node[]) => Promise<void>;
    args: string[];
  },
): Server {
  const state: ServerState = {
    log: opts.log,
    args: parse(opts.args),
    opts,
    closed: false,
    prev: undefined,
  };
  return {
    update: (x) => update(state, x),
    start: (x) => start(state, x),
    close: () => close(state),
    get state() {
      return state;
    },
  };
}

function HelpPage(help: Help): Node {
  return Sequence("\n", Help(help), "\n\n");
}

function ServerHeader(header: Header): Node {
  // Log header.
  return Sequence(
    "\n",
    Sections(
      Header(header),
      Blocks(
        Heading(
          Emoji("bell"),
          "Server Events",
        ),
        "", // for following parts
      ),
    ),
  );
}

async function start(state: ServerState, startOptions: StartOptions) {
  if (state.closed) {
    throw new Error("Server cannot be started since it was already closed.");
  }

  // Wait for shutdown message.
  for await (const line of readLines(startOptions.stdin)) {
    if (line === "q") {
      await startOptions.close();
      break;
    } else {
      state.log(Lines(
        Divider(),
        Blocks(
          Heading(
            Emoji("questionMark"),
            "What do you want to do?",
          ),
          Hints({
            binary: state.opts.help.header.name,
          }),
        ),
        Divider(),
        "",
      ));
    }
  }
}

function update(state: ServerState, event: ServerEvent) {
  state.log(
    Event({
      ...event,
      prev: state.prev,
    }),
    "\n",
  );
  state.prev = event.time;
}

function close(state: ServerState) {
  if (state.closed) {
    throw new Error("Server cannot be closed since it was already closed.");
  }

  state.closed = true;
  state.log(
    Sections(
      "",
      Heading(
        Emoji("zzz"),
        "Server stopped",
      ),
    ),
    "\n\n",
  );
}
