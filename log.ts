import {
  Node,
  stringify as _stringify,
} from "https://deno.land/x/ansiml@v0.0.3/mod.ts";

export function log(...args: Node[]): void {
  console.log(logString(...args));
}

export function logString(...args: Node[]): string {
  return _stringify({
    commands: [],
    children: args,
  });
}

export async function logFile(file: string, ...args: Node[]): Promise<void> {
  await Deno.writeTextFile(
    file,
    logString(...args),
  );
}

export async function logWriter(
  writer: Deno.Writer,
  ...args: Node[]
): Promise<void> {
  const text = logString(...args);
  const buffer = new TextEncoder().encode(text);
  await writer.write(buffer);
}
