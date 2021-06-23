import { readLines } from "https://deno.land/std@0.97.0/io/mod.ts";

export async function readUntil<Y = string>(
  reader: Deno.Reader,
  match: (x: string) => Promise<null | Y>,
): Promise<Y> {
  for await (const line of readLines(reader)) {
    const y = await match(line);
    if (y != null) {
      return y;
    }
  }
  throw new Error("readUntil: never matched predicate.");
}
