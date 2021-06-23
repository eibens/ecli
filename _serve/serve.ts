import { Node } from "https://deno.land/x/ansiml@v0.0.3/mod.ts";
import { hasHelpFlag } from "./flags.ts";
import { logWriter } from "../log.ts";
import { CloseSection, Docs, HintSection, Log, OpenSection } from "./theme.ts";
import { readUntilAsync } from "./read.ts";

export type Closer = {
  close: () => Promise<void>;
};

export type Process = {
  args: string[];
  stdout: Deno.Writer;
  stdin: Deno.Reader;
};

export type ServeOptions = {
  docs: Docs;
  timeFormat?: string;
  start: (server: Server) => Closer;
  process: Process;
};

export type Server = Closer & {
  log: (event: Log) => Promise<void>;
};

export type ServerState = {
  closed: boolean;
};

export async function serve(options: ServeOptions): Promise<void> {
  options.timeFormat ||= "yyyy-MM-ddTHH:mm:ss.SSS";

  async function log(...args: Node[]) {
    await logWriter(options.process.stdout, ...args);
  }

  if (hasHelpFlag(options.process.args)) {
    await log(Docs(options.docs));
    return;
  }

  const server: Server = {
    log: async (event) => {
      await log(Log(event));
    },
    close: async () => {
      await log(CloseSection(options.docs.header));
    },
  };

  await log(OpenSection(options.docs.header));
  const closer = options.start(server);

  const input = await readUntilAsync(options.process.stdin, async (x) => {
    if (x === "q") {
      return "close";
    }
    const name = options.docs.usage?.binary || options.docs.header.name;
    await log(HintSection({ name }));
    return null;
  });

  if (input === "close") {
    await closer.close();
    await server.close();
    return;
  }

  throw new Error("serve: unknown state");
}
